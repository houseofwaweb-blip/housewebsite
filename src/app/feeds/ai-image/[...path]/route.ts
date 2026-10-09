import type { NextRequest } from "next/server";

/**
 * AI-image tag route for the Google feed.
 *
 * Shopify strips XMP/IPTC on upload, so our AI editorial images (the
 * `-howa-editorial` files) reach Merchant Center WITHOUT the IPTC
 * `DigitalSourceType = trainedAlgorithmicMedia` tag that Google requires on
 * AI-generated imagery. The feed points `g:image_link` for those images at this
 * route, which fetches the file from Shopify's CDN, injects the XMP tag into the
 * PNG, and serves it back.
 *
 * Locked down (per the brief):
 *  - Only fetches from cdn.shopify.com, only under /s/files/.
 *  - Only tags AI images (`-howa-editorial`); anything else is passed through
 *    UNCHANGED, so a supplier photo can never be tagged.
 *  - Returns image/png, 200, no redirects, a stable URL per image (the Shopify
 *    path + ?v are preserved), cached hard at the edge so Merchant re-crawls
 *    don't add to Vercel usage.
 */
export const runtime = "nodejs";

const ONE_YEAR = 60 * 60 * 24 * 365;

// IPTC Extension DigitalSourceType = trainedAlgorithmicMedia, as an XMP packet.
const XMP_PACKET = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"
    Iptc4xmpExt:DigitalSourceType="http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia"/>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

// CRC-32 (ISO-HDLC, as PNG chunks use).
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Insert an iTXt XMP chunk right after IHDR. Returns the original buffer if it
 *  isn't a PNG or already carries an XMP packet. */
function injectXmp(png: Buffer): Buffer {
  if (png.length < 8 || !png.subarray(0, 8).equals(PNG_SIG)) return png;
  if (png.includes(Buffer.from("XML:com.adobe.xmp", "latin1"))) return png; // already tagged
  // IHDR is always the first chunk: 4 (len) + 4 (type) + 13 (data) + 4 (crc).
  const insertAt = 8 + 4 + 4 + 13 + 4;
  const keyword = Buffer.from("XML:com.adobe.xmp", "latin1");
  // keyword\0 + compressionFlag(0) + compressionMethod(0) + langTag\0 + transKeyword\0 + text
  const data = Buffer.concat([
    keyword,
    Buffer.from([0x00, 0x00, 0x00, 0x00, 0x00]),
    Buffer.from(XMP_PACKET, "utf8"),
  ]);
  const type = Buffer.from("iTXt", "latin1");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([type, data])), 0);
  const chunk = Buffer.concat([len, type, data, crc]);
  return Buffer.concat([png.subarray(0, insertAt), chunk, png.subarray(insertAt)]);
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const search = new URL(req.url).search; // preserves ?v= (stable + cache key)
  // Rebuild the Shopify CDN URL. The host is fixed here, so the path can never
  // point anywhere else; we still assert the file path as belt-and-braces.
  const cdnUrl = `https://cdn.shopify.com/${path.join("/")}${search}`;
  let u: URL;
  try {
    u = new URL(cdnUrl);
  } catch {
    return new Response("Bad request", { status: 400 });
  }
  if (u.hostname !== "cdn.shopify.com" || !u.pathname.startsWith("/s/files/")) {
    return new Response("Forbidden", { status: 403 });
  }

  const upstream = await fetch(cdnUrl, { next: { revalidate: ONE_YEAR } });
  if (!upstream.ok) return new Response("Not found", { status: 404 });
  const buf = Buffer.from(await upstream.arrayBuffer());

  // Only AI editorial PNGs get the tag; everything else passes through untouched.
  const name = u.pathname.split("/").pop() ?? "";
  const isAi = /-howa-editorial/i.test(name);
  const out = isAi ? injectXmp(buf) : buf;

  return new Response(new Uint8Array(out), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": `public, max-age=${ONE_YEAR}, s-maxage=${ONE_YEAR}, immutable`,
    },
  });
}
