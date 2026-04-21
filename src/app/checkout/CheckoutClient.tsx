"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { useCart } from "@/components/commerce/CartContext";

export function CheckoutClient() {
  const { lines, count, subtotal } = useCart();
  const router = useRouter();
  const [paying, setPaying] = React.useState(false);
  const [giftWrap, setGiftWrap] = React.useState(false);
  const [showNote, setShowNote] = React.useState(false);
  const [showPromo, setShowPromo] = React.useState(false);
  const [delivery, setDelivery] = React.useState<"standard" | "next" | "saturday">("standard");

  const deliveryCost = delivery === "standard" ? 0 : delivery === "next" ? 6.95 : 9.95;
  const giftCost = giftWrap ? 4.5 : 0;
  const total = subtotal + deliveryCost + giftCost;

  function handlePay() {
    setPaying(true);
    setTimeout(() => router.push("/checkout/confirmation"), 2200);
  }

  if (lines.length === 0) {
    return (
      <article className="bg-house-cream text-house-brown px-[5vw] py-[12vh] text-center max-w-[600px] mx-auto">
        <h1 className="em-accent font-display font-medium text-[clamp(28px,4vw,40px)] leading-[1.1] mb-4">
          Nothing to check out.
        </h1>
        <p className="font-sans text-[14px] text-house-stone mb-8">
          Your basket is empty. Add something from the shop first.
        </p>
        <Link
          href="/shop"
          className="inline-block px-8 py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold no-underline transition-all duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light"
        >
          Browse the shop
        </Link>
      </article>
    );
  }

  return (
    <article className="bg-house-cream text-house-brown">
      {/* Two-column layout — form left, summary right */}
      <div className="max-w-[1120px] mx-auto px-[5vw] py-10 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-12 items-start">

        {/* ============ LEFT: Form ============ */}
        <div>
          <h1 className="font-display font-medium text-[clamp(28px,3.5vw,40px)] leading-[1.1] mb-1">
            Checkout.
          </h1>
          <p className="font-sans text-[13px] text-house-stone leading-[1.55] mb-8">
            Enter your details, review your order, and pay. Everything on one page.
          </p>

          {/* Contact */}
          <SectionHead>Contact</SectionHead>
          <Field label="Email address" type="email" placeholder="your@email.co.uk" />
          <Field label="Phone (for delivery updates)" type="tel" placeholder="+44 7700 000000" />

          {/* Address */}
          <SectionHead>Delivery address</SectionHead>
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <Field label="First name" placeholder="First" />
            <Field label="Last name" placeholder="Last" />
          </div>
          <Field label="Address line 1" placeholder="House name or number, street" />
          <Field label="Address line 2 (optional)" placeholder="Flat, apartment, etc." />
          <div className="grid grid-cols-[2fr_2fr_1.2fr] gap-3 max-md:grid-cols-1">
            <Field label="City" placeholder="City" />
            <Field label="County" placeholder="County" />
            <Field label="Postcode" placeholder="SW1A 1AA" />
          </div>

          {/* Delivery method */}
          <SectionHead>Delivery method</SectionHead>
          <RadioOption
            selected={delivery === "standard"}
            onClick={() => setDelivery("standard")}
            name="Standard delivery"
            detail="3–5 working days. Tracked and signed."
            price="Free"
          />
          <RadioOption
            selected={delivery === "next"}
            onClick={() => setDelivery("next")}
            name="Next-day delivery"
            detail="Order before 2pm. Free for HoWA+ members."
            price="£6.95"
          />
          <RadioOption
            selected={delivery === "saturday"}
            onClick={() => setDelivery("saturday")}
            name="Saturday delivery"
            detail="Order by Thursday 2pm."
            price="£9.95"
          />

          {/* Gift wrapping */}
          <SectionHead>Gift wrapping</SectionHead>
          <button
            type="button"
            onClick={() => setGiftWrap(!giftWrap)}
            className={cn(
              "w-full flex items-start gap-2.5 p-3.5 border bg-house-white cursor-pointer transition-colors duration-[var(--t-base)] mb-1.5",
              giftWrap ? "border-house-gold bg-[rgba(184,148,62,0.04)]" : "border-house-brown/12 hover:border-house-gold",
            )}
          >
            <span className={cn(
              "w-4 h-4 mt-0.5 border flex items-center justify-center flex-shrink-0 transition-all duration-[var(--t-fast)]",
              giftWrap ? "bg-house-gold border-house-gold" : "border-house-stone",
            )}>
              {giftWrap ? <span className="text-white text-[10px]">✓</span> : null}
            </span>
            <span className="flex-1 text-left">
              <span className="block font-sans text-[13px]">House gift wrapping</span>
              <span className="block font-sans text-[11px] text-house-stone mt-0.5">Tissue paper, wax seal, handwritten card.</span>
            </span>
            <span className="font-sans text-[13px] text-house-stone">£4.50</span>
          </button>
          {giftWrap ? (
            <div className="mt-2.5">
              <textarea
                placeholder="Your gift message (optional)"
                className="w-full p-3 border border-house-brown/15 bg-house-white font-sans text-[13px] text-house-brown resize-y min-h-[64px] focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
              />
              <p className="font-sans text-[10px] text-house-stone mt-1">Up to 200 characters. Written by hand on House card stock.</p>
            </div>
          ) : null}

          {/* Order note */}
          {!showNote ? (
            <button
              type="button"
              onClick={() => setShowNote(true)}
              className="mt-3.5 font-sans text-[11px] tracking-[0.14em] uppercase text-house-gold bg-transparent border-0 cursor-pointer border-b border-dotted border-house-gold pb-0.5 hover:border-solid transition-all"
            >
              + Add an order note
            </button>
          ) : (
            <div className="mt-3.5">
              <textarea
                placeholder="Any special instructions for delivery or packing..."
                className="w-full p-3 border border-house-brown/15 bg-house-white font-sans text-[13px] text-house-brown resize-y min-h-[60px] focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
              />
              <p className="font-sans text-[10px] text-house-stone mt-1">We'll do our best to accommodate your request.</p>
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-house-brown/8 my-9" />

          {/* Payment */}
          <SectionHead>Payment</SectionHead>

          {/* Express */}
          <p className="font-sans text-[10px] tracking-[0.16em] uppercase text-house-stone text-center mb-2.5">
            Express checkout
          </p>
          <div className="flex gap-2 mb-5 max-md:flex-col">
            <button type="button" className="flex-1 py-3.5 text-center font-sans text-[12px] font-medium tracking-[0.04em] bg-black text-white border border-black cursor-pointer"> Pay</button>
            <button type="button" className="flex-1 py-3.5 text-center font-sans text-[12px] font-medium tracking-[0.04em] bg-house-white text-house-brown border border-house-brown/12 cursor-pointer hover:border-house-gold transition-colors duration-[var(--t-base)]">G Pay</button>
            <button type="button" className="flex-1 py-3.5 text-center font-sans text-[12px] font-medium tracking-[0.04em] bg-[#ffc439] text-[#003087] border border-[#ffc439] cursor-pointer">PayPal</button>
          </div>

          <div className="flex items-center gap-4 my-5">
            <span className="flex-1 h-px bg-house-brown/8" />
            <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-house-stone">or pay with card</span>
            <span className="flex-1 h-px bg-house-brown/8" />
          </div>

          {/* Card icons */}
          <div className="flex gap-2 mb-3.5">
            {["VISA", "MC", "AMEX"].map((c) => (
              <span key={c} className="w-10 h-[26px] border border-house-brown/10 flex items-center justify-center font-sans text-[9px] font-medium text-house-stone tracking-[0.04em] bg-house-white">
                {c}
              </span>
            ))}
          </div>

          <Field label="Name on card" placeholder="As it appears on your card" />
          <Field label="Card number" placeholder="1234 5678 9012 3456" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Expiry date" placeholder="MM / YY" />
            <Field label="Security code" placeholder="CVC" />
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-2.5 font-sans text-[13px] text-house-stone my-4">
            <span className="w-4 h-4 border border-house-gold bg-house-gold flex items-center justify-center">
              <span className="text-white text-[10px]">✓</span>
            </span>
            Billing address same as delivery
          </div>

          {/* Legal */}
          <p className="font-sans text-[11px] text-house-stone leading-[1.55] mb-5">
            By completing your purchase you agree to the House of Willow Alexander{" "}
            <Link href="/legal/terms" className="text-house-gold border-b border-dotted border-house-gold no-underline">terms of sale</Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className="text-house-gold border-b border-dotted border-house-gold no-underline">privacy policy</Link>.
            Your payment is processed securely. We never store your card details.
          </p>

          {/* Pay button */}
          <button
            type="button"
            onClick={handlePay}
            disabled={paying}
            className={cn(
              "block w-full py-4 font-sans text-[12px] tracking-[0.18em] uppercase text-white bg-house-gold border border-house-gold cursor-pointer text-center transition-colors duration-[var(--t-base)] ease-out hover:bg-house-gold-light hover:border-house-gold-light",
              paying && "opacity-70 pointer-events-none",
            )}
          >
            {paying ? (
              <span className="inline-flex items-center gap-2">
                Processing
                <span className="is-round inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white [animation:spin_0.8s_linear_infinite]" />
              </span>
            ) : (
              <>Place order<span className="font-display font-medium ml-1">· £{total.toFixed(0)}</span></>
            )}
          </button>

          <Link
            href="/shop/basket"
            className="block text-center mt-3 font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone no-underline hover:text-house-brown transition-colors duration-[var(--t-base)]"
          >
            ← Return to basket
          </Link>

          <div className="flex items-center justify-center gap-1.5 mt-4 font-sans text-[10px] tracking-[0.12em] uppercase text-house-stone">
            <span className="text-house-gold">◆</span> 256-bit SSL encryption
          </div>
        </div>

        {/* ============ RIGHT: Sticky summary ============ */}
        <div className="md:sticky md:top-[80px] max-md:order-first">
          <div className="bg-house-white border border-house-brown/8 p-6">
            <h3 className="font-display font-medium text-[16px] mb-4">
              Your order ({count})
            </h3>

            {lines.map((line) => (
              <div key={line.handle} className="flex gap-3 py-2.5 border-b border-house-brown/5 last:border-b-0">
                <div className="w-[52px] h-[65px] flex-shrink-0 overflow-hidden bg-house-cream">
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={104}
                    height={130}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-display font-medium text-[13px]">{line.title}</span>
                  <span className="font-sans text-[10px] text-house-stone">
                    {line.collection}{line.houseApproved ? " · House Approved" : ""}
                  </span>
                  <span className="font-sans text-[10px] text-house-stone mt-0.5">Qty: {line.quantity}</span>
                </div>
                <span className="font-display font-medium text-[13px] flex items-center">{line.price}</span>
              </div>
            ))}

            <div className="mt-1 pt-2.5">
              <div className="flex justify-between font-sans text-[13px] py-1">
                <span className="text-house-stone">Subtotal</span>
                <span>£{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] py-1">
                <span className="text-house-stone">Delivery</span>
                <span>{deliveryCost === 0 ? "Free" : `£${deliveryCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] py-1">
                <span className="text-house-stone">Gift wrapping</span>
                <span>{giftWrap ? "£4.50" : "—"}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 mt-2 border-t border-house-brown/10">
                <span className="font-display font-medium text-[17px]">Total</span>
                <span className="font-display font-medium text-[17px]">£{total.toFixed(0)}</span>
              </div>
            </div>

            <Link
              href="/shop/basket"
              className="inline-block mt-3 font-sans text-[11px] text-house-gold no-underline border-b border-dotted border-house-gold pb-0.5 hover:border-solid transition-all"
            >
              Edit basket →
            </Link>
          </div>

          {/* Promo */}
          <div className="mt-4 pt-3.5 border-t border-house-brown/5">
            <button
              type="button"
              onClick={() => setShowPromo(!showPromo)}
              className="font-sans text-[11px] tracking-[0.14em] uppercase text-house-stone bg-transparent border-0 cursor-pointer hover:text-house-brown transition-colors duration-[var(--t-base)]"
            >
              Have a promo code?
            </button>
            {showPromo ? (
              <div className="flex gap-2 mt-2.5">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2.5 border border-house-brown/15 font-sans text-[13px] bg-house-white text-house-brown focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
                />
                <button
                  type="button"
                  className="px-4 py-2.5 font-sans text-[10px] tracking-[0.16em] uppercase bg-house-brown text-house-cream border border-house-brown cursor-pointer hover:bg-house-gold hover:border-house-gold transition-colors duration-[var(--t-base)]"
                >
                  Apply
                </button>
              </div>
            ) : null}
          </div>

          {/* HoWA+ */}
          <div className="bg-howa-navy text-house-cream p-4 mt-4">
            <div className="font-sans text-[9px] tracking-[0.22em] uppercase text-house-gold-light mb-0.5">
              HoWA+ · £16.99 /month
            </div>
            <div className="font-display font-medium text-[14px] text-house-gold-light">
              Save £{(subtotal * 0.1).toFixed(0)} on this order
            </div>
            <p className="font-sans text-[11px] text-house-cream/60 mt-0.5">
              10% off every order with HoWA+.{" "}
              <Link href="/howa/plans" className="text-house-gold-light no-underline border-b border-dotted border-house-gold-light">Learn more</Link>
            </p>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-[7px] mt-4 pt-3.5 border-t border-house-brown/5">
            {["256-bit SSL encryption", "PCI DSS compliant", "28-day returns", "Complimentary UK delivery"].map(
              (t) => (
                <span key={t} className="flex items-center gap-1.5 font-sans text-[10px] tracking-[0.12em] uppercase text-house-stone">
                  <span className="is-round w-[5px] h-[5px] bg-house-gold" />
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between mb-3.5 pb-2 border-b border-house-brown/8 mt-8 first:mt-0">
      <h2 className="font-display font-medium text-[15px]">{children}</h2>
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="mb-3.5">
      <label className="block font-sans text-[10px] tracking-[0.16em] uppercase text-house-stone mb-1.5">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3.5 py-[11px] border border-house-brown/15 bg-house-white font-sans text-[14px] font-light text-house-brown placeholder:text-house-stone placeholder:font-light focus:border-house-gold focus:outline-none transition-colors duration-[var(--t-base)]"
      />
    </div>
  );
}

function RadioOption({
  selected,
  onClick,
  name,
  detail,
  price,
}: {
  selected: boolean;
  onClick: () => void;
  name: string;
  detail: string;
  price: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3.5 border bg-house-white cursor-pointer transition-colors duration-[var(--t-base)] mb-1.5",
        selected ? "border-house-gold bg-[rgba(184,148,62,0.04)]" : "border-house-brown/12 hover:border-house-gold",
      )}
    >
      <span className={cn(
        "is-round w-4 h-4 border flex items-center justify-center flex-shrink-0",
        selected ? "border-house-gold" : "border-house-stone",
      )}>
        {selected ? <span className="is-round w-2 h-2 bg-house-gold" /> : null}
      </span>
      <span className="flex-1 text-left">
        <span className="block font-sans text-[13px]">{name}</span>
        <span className="block font-sans text-[11px] text-house-stone mt-0.5">{detail}</span>
      </span>
      <span className="font-sans text-[13px] text-house-stone">{price}</span>
    </button>
  );
}
