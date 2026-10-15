"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/primitives";
import { Toast } from "@/components/ui/toast";
import { mockSupportFormSubmission } from "@/mocks/support-form";
import { supportTopics } from "./support-topics";
import styles from "./support-form.module.css";

export function SupportForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className={styles.formCard}>
      <form aria-labelledby="support-form-title" onSubmit={handleSubmit}>
        <h2 id="support-form-title">Write to support</h2>
        <div className={styles.fields}>
          <label>
            <span>Your email</span>
            <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          <label>
            <span>What is this about?</span>
            <select name="topic" defaultValue="" required>
              <option value="" disabled>Choose a topic</option>
              {supportTopics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>
          </label>
          <label>
            <span>Subject</span>
            <input type="text" name="subject" placeholder="A short summary" required />
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Tell us what happened" rows={6} required />
          </label>
        </div>
        <p className={styles.note}>
          This preview does not send or store your message. Email support@jobiest.com to contact the support team.
        </p>
        <Button type="submit" variant="navy">Preview contact message</Button>
      </form>
      {submitted ? (
        <div className={styles.toastSlot}>
          <Toast message={mockSupportFormSubmission().message} onDismiss={() => setSubmitted(false)} tone="info" />
        </div>
      ) : null}
    </div>
  );
}
