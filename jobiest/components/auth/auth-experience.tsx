"use client";

import { useState, type FormEvent } from "react";
import { getAuthPreviewMessage, type AuthPreviewKind } from "@/mocks/auth";
import styles from "./auth-experience.module.css";

type Mode = "signup" | "login";

export function AuthExperience({ mode }: { mode: Mode }) {
  const isSignup = mode === "signup";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  function previewProvider(kind: AuthPreviewKind) {
    setErrors({});
    setMessage(getAuthPreviewMessage(kind));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (isSignup && fullName.trim().length < 2) nextErrors.fullName = "Enter your name to continue.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Enter your password.";
    if (isSignup && password.length > 0 && password.length < 8) nextErrors.password = "Use at least 8 characters.";
    if (isSignup && password.length >= 8 && !/\d/.test(password)) nextErrors.password = "Add at least one number.";
    if (isSignup && password.length >= 8 && /\d/.test(password) && !/[^A-Za-z0-9\s]/.test(password)) nextErrors.password = "Add at least one special character.";
    setErrors(nextErrors);
    setMessage(nextErrors.email || nextErrors.password || nextErrors.fullName ? "Please check the highlighted fields." : getAuthPreviewMessage(mode));
  }

  return (
    <section className={styles.authExperience} aria-labelledby="auth-title">
      <header className={styles.heading}>
        <h1 id="auth-title">{isSignup ? "Create your free account" : "Welcome back"}</h1>
        {isSignup ? <p>Your career profile comes later, when it matters.</p> : <p>Sign in to your Jobiest account.</p>}
      </header>

      <div className={styles.providerGrid} aria-label="Other sign-in options">
        <button className={styles.providerButton} type="button" onClick={() => previewProvider("google")}>Continue with Google</button>
        <button className={styles.providerButton} type="button" onClick={() => previewProvider("linkedin")}>Continue with LinkedIn</button>
      </div>

      <div className={styles.divider}><span>or with email</span></div>

      <form className={styles.form} noValidate onSubmit={submit}>
        {isSignup ? (
          <label className={styles.field} htmlFor="full-name">
            <span>Full name</span>
            <input id="full-name" name="name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? "full-name-error" : undefined} />
            {errors.fullName ? <span className={styles.fieldError} id="full-name-error">{errors.fullName}</span> : null}
          </label>
        ) : null}
        <label className={styles.field} htmlFor="email-address">
          <span>Email</span>
          <input id="email-address" name="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email ? <span className={styles.fieldError} id="email-error">{errors.email}</span> : null}
        </label>
        <label className={styles.field} htmlFor="account-password">
          <span>Password</span>
          <input id="account-password" name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(event) => setPassword(event.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={isSignup ? "password-rules" : errors.password ? "password-error" : undefined} />
          {isSignup ? <span className={styles.hint} id="password-rules">At least 8 characters, one number, and one special character.</span> : null}
          {errors.password ? <span className={styles.fieldError} id="password-error">{errors.password}</span> : null}
        </label>
        {message ? <p className={errors.fullName || errors.email || errors.password ? styles.errorNotice : styles.statusNotice} role={errors.fullName || errors.email || errors.password ? "alert" : "status"} aria-live="polite">{message}</p> : null}
        <button className={styles.submitButton} type="submit">{isSignup ? "Create account" : "Sign in"}</button>
      </form>
    </section>
  );
}
