"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons/icons";
import styles from "./pricing-cards.module.css";

type Currency = "NGN" | "USD";

type Plan = {
  name: string;
  price: Record<Currency, string>;
  summary: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: { NGN: "₦0", USD: "$0" },
    summary: "3 CV or cover letter generations, plus 10 tool uses a day.",
  },
  {
    name: "Basic",
    price: { NGN: "₦5,000", USD: "$3.99" },
    summary: "The entry paid tier at its published monthly price.",
  },
  {
    name: "Premium",
    price: { NGN: "₦10,000", USD: "$7.99" },
    summary: "The middle paid tier at its published monthly price.",
    featured: true,
  },
  {
    name: "Max",
    price: { NGN: "₦20,000", USD: "$14.99" },
    summary: "The top published tier at its monthly price.",
  },
];

const liveSignup = "https://jobiest.com/signup";

export function PricingCards() {
  const [currency, setCurrency] = useState<Currency>("NGN");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("jobiest-currency");
      if (saved === "USD" || saved === "NGN") setCurrency(saved);
    } catch {
      // Keep the server-rendered Naira default if storage is unavailable.
    }
  }, []);

  function chooseCurrency(nextCurrency: Currency) {
    setCurrency(nextCurrency);
    try {
      window.localStorage.setItem("jobiest-currency", nextCurrency);
    } catch {
      // The switch still works for this visit if storage is unavailable.
    }
  }

  return (
    <div className={styles.pricing}>
      <div className={styles.controls}>
        <div className={styles.currencyGroup} role="group" aria-label="Choose a display currency">
          <button type="button" aria-pressed={currency === "NGN"} onClick={() => chooseCurrency("NGN")}>
            Nigeria, Naira
          </button>
          <button type="button" aria-pressed={currency === "USD"} onClick={() => chooseCurrency("USD")}>
            Global, USD
          </button>
        </div>
        <span className={styles.currencyNote}>Monthly prices only.</span>
      </div>

      <div className={styles.cards}>
        {plans.map((plan) => (
          <article key={plan.name} className={`${styles.card} ${plan.featured ? styles.featured : ""}`}>
            <div className={styles.cardTop}>
              <h3>{plan.name}</h3>
              {plan.featured ? <span className={styles.featuredTag}><Icon name="spark" width={15} height={15} />Higher tier</span> : null}
            </div>
            <p className={styles.price}>
              <strong>{plan.price[currency]}</strong>
              <span>/ month</span>
            </p>
            <p className={styles.summary}>{plan.summary}</p>
            {plan.name === "Free" ? (
              <ul className={styles.freeFacts}>
                <li><Icon name="check" width={17} height={17} />3 CV or cover letter generations</li>
                <li><Icon name="check" width={17} height={17} />10 tool uses a day</li>
                <li><Icon name="check" width={17} height={17} />All 10 public tools are free to use</li>
              </ul>
            ) : (
              <p className={styles.pendingNote}>Paid-tier allowances are not shown in this preview.</p>
            )}
            {plan.name === "Free" ? (
              <a className={styles.primaryAction} href={liveSignup} target="_blank" rel="noopener noreferrer">
                Create a free account
                <span className="visually-hidden"> (opens the live Jobiest site in a new tab)</span>
                <Icon name="arrow-right" width={17} height={17} />
              </a>
            ) : null}
          </article>
        ))}
      </div>
      <p className={styles.disclosure}>
        The approved Free limits and published monthly prices are shown here. Paid per-tier allowances and automation details are omitted because current public descriptions conflict. No payment is collected in this preview.
      </p>
    </div>
  );
}
