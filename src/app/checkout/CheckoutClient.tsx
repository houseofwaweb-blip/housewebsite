"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/commerce/CartContext";
import s from "./checkout.module.css";

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
      <div className={s.empty}>
        <div className={s.emptyInner}>
          <p className={s.eyebrow}>Checkout</p>
          <h1 className={s.emptyTitle}>
            Nothing to <em>check out.</em>
          </h1>
          <p className={s.emptyLede}>
            Your basket is empty. Add something from the shop first.
          </p>
          <Link href="/shop" className={s.btnFilled}>
            Browse the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={s.page}>
      <div className={s.layout}>
        {/* LEFT — Form */}
        <div className={s.form}>
          <p className={s.eyebrow}>Checkout</p>
          <h1 className={s.title}>Place your <em>order.</em></h1>
          <p className={s.lede}>
            Enter your details, review your order, and pay. Everything on one
            page.
          </p>

          <SectionHead>Contact</SectionHead>
          <Field label="Email address" type="email" placeholder="your@email.co.uk" />
          <Field label="Phone (for delivery updates)" type="tel" placeholder="+44 7700 000000" />

          <SectionHead>Delivery address</SectionHead>
          <div className={s.row2}>
            <Field label="First name" placeholder="First" />
            <Field label="Last name" placeholder="Last" />
          </div>
          <Field label="Address line 1" placeholder="House name or number, street" />
          <Field label="Address line 2 (optional)" placeholder="Flat, apartment, etc." />
          <div className={s.row3}>
            <Field label="City" placeholder="City" />
            <Field label="County" placeholder="County" />
            <Field label="Postcode" placeholder="SW1A 1AA" />
          </div>

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

          <SectionHead>Gift wrapping</SectionHead>
          <button
            type="button"
            onClick={() => setGiftWrap(!giftWrap)}
            className={`${s.option} ${giftWrap ? s.optionSelected : ""}`}
          >
            <span className={`${s.checkbox} ${giftWrap ? s.checkboxOn : ""}`}>
              {giftWrap ? <span className={s.checkboxTick}>✓</span> : null}
            </span>
            <span className={s.optionLabel}>
              <span className={s.optionName}>House gift wrapping</span>
              <span className={s.optionDetail}>Tissue paper, wax seal, handwritten card.</span>
            </span>
            <span className={s.optionPrice}>£4.50</span>
          </button>
          {giftWrap ? (
            <div className={s.subInput}>
              <textarea
                placeholder="Your gift message (optional)"
                className={s.textarea}
              />
              <p className={s.subInputHint}>Up to 200 characters. Written by hand on House card stock.</p>
            </div>
          ) : null}

          {!showNote ? (
            <button
              type="button"
              onClick={() => setShowNote(true)}
              className={s.linkBtn}
            >
              + Add an order note
            </button>
          ) : (
            <div className={s.subInput}>
              <textarea
                placeholder="Any special instructions for delivery or packing..."
                className={s.textarea}
              />
              <p className={s.subInputHint}>We'll do our best to accommodate your request.</p>
            </div>
          )}

          <div className={s.divider} />

          <SectionHead>Payment</SectionHead>

          <p className={s.expressLabel}>Express checkout</p>
          <div className={s.expressRow}>
            <button type="button" className={`${s.expressBtn} ${s.expressApple}`}>Pay</button>
            <button type="button" className={`${s.expressBtn} ${s.expressGoogle}`}>G Pay</button>
            <button type="button" className={`${s.expressBtn} ${s.expressPaypal}`}>PayPal</button>
          </div>

          <div className={s.orRow}>
            <span className={s.orLine} />
            <span className={s.orText}>or pay with card</span>
            <span className={s.orLine} />
          </div>

          <div className={s.cardIcons}>
            {["VISA", "MC", "AMEX"].map((c) => (
              <span key={c} className={s.cardIcon}>{c}</span>
            ))}
          </div>

          <Field label="Name on card" placeholder="As it appears on your card" />
          <Field label="Card number" placeholder="1234 5678 9012 3456" />
          <div className={s.row2}>
            <Field label="Expiry date" placeholder="MM / YY" />
            <Field label="Security code" placeholder="CVC" />
          </div>

          <div className={s.billingNote}>
            <span className={`${s.checkbox} ${s.checkboxOn}`}>
              <span className={s.checkboxTick}>✓</span>
            </span>
            Billing address same as delivery
          </div>

          <p className={s.legal}>
            By completing your purchase you agree to the House of Willow Alexander{" "}
            <Link href="/legal/terms" className={s.legalLink}>terms of sale</Link>{" "}
            and{" "}
            <Link href="/legal/privacy" className={s.legalLink}>privacy policy</Link>.
            Your payment is processed securely. We never store your card details.
          </p>

          <button
            type="button"
            onClick={handlePay}
            disabled={paying}
            className={`${s.payBtn} ${paying ? s.payBtnPaying : ""}`}
          >
            {paying ? (
              <span className={s.payBtnLoading}>
                Processing
                <span className={s.spinner} />
              </span>
            ) : (
              <>Place order<span className={s.payBtnTotal}>· £{total.toFixed(0)}</span></>
            )}
          </button>

          <Link href="/shop/basket" className={s.returnLink}>
            ← Return to basket
          </Link>

          <div className={s.ssl}>
            <span className={s.sslMark}>◆</span> 256-bit SSL encryption
          </div>
        </div>

        {/* RIGHT — Summary */}
        <aside className={s.summary}>
          <div className={s.summaryCard}>
            <h3 className={s.summaryTitle}>Your order ({count})</h3>

            {lines.map((line) => (
              <div key={line.handle} className={s.summaryLine}>
                <div className={s.summaryLineImage}>
                  <Image
                    src={line.image}
                    alt={line.title}
                    width={104}
                    height={130}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className={s.summaryLineBody}>
                  <span className={s.summaryLineName}>{line.title}</span>
                  <span className={s.summaryLineMeta}>
                    {line.collection}{line.houseApproved ? " · House Approved" : ""}
                  </span>
                  <span className={s.summaryLineQty}>Qty: {line.quantity}</span>
                </div>
                <span className={s.summaryLinePrice}>{line.price}</span>
              </div>
            ))}

            <div className={s.summaryTotals}>
              <div className={s.summaryTotalRow}>
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(0)}</span>
              </div>
              <div className={s.summaryTotalRow}>
                <span>Delivery</span>
                <span>{deliveryCost === 0 ? "Free" : `£${deliveryCost.toFixed(2)}`}</span>
              </div>
              <div className={s.summaryTotalRow}>
                <span>Gift wrapping</span>
                <span>{giftWrap ? "£4.50" : "—"}</span>
              </div>
              <div className={s.summaryTotalFinal}>
                <span>Total</span>
                <span>£{total.toFixed(0)}</span>
              </div>
            </div>

            <Link href="/shop/basket" className={s.summaryEditLink}>
              Edit basket →
            </Link>
          </div>

          <div className={s.promoBlock}>
            <button
              type="button"
              onClick={() => setShowPromo(!showPromo)}
              className={s.promoToggle}
            >
              Have a promo code?
            </button>
            {showPromo ? (
              <div className={s.promoInputRow}>
                <input type="text" placeholder="Enter code" className={s.promoInput} />
                <button type="button" className={s.promoApply}>Apply</button>
              </div>
            ) : null}
          </div>

          <div className={s.upsell}>
            <p className={s.upsellEy}>HoWA+ · £16.99 /month</p>
            <p className={s.upsellSave}>
              Save £{(subtotal * 0.1).toFixed(0)} on this order
            </p>
            <p className={s.upsellBody}>
              10% off every order with HoWA+.{" "}
              <Link href="/howa/plus" className={s.upsellLink}>Learn more</Link>
            </p>
          </div>

          <div className={s.trust}>
            {["256-bit SSL encryption", "PCI DSS compliant", "28-day returns", "Complimentary UK delivery"].map((t) => (
              <span key={t} className={s.trustItem}>
                <span className={s.trustDot} />
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.sectionHead}>
      <h2>{children}</h2>
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
    <div className={s.field}>
      <label className={s.fieldLabel}>{label}</label>
      <input type={type} placeholder={placeholder} className={s.fieldInput} />
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
      className={`${s.option} ${selected ? s.optionSelected : ""}`}
    >
      <span className={`${s.radio} ${selected ? s.radioOn : ""}`}>
        {selected ? <span className={s.radioDot} /> : null}
      </span>
      <span className={s.optionLabel}>
        <span className={s.optionName}>{name}</span>
        <span className={s.optionDetail}>{detail}</span>
      </span>
      <span className={s.optionPrice}>{price}</span>
    </button>
  );
}
