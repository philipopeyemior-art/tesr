# Underdawg — Who Provides Which APIs (client-facing summary)

## What the CLIENT provides (accounts, contracts, costs — we integrate)
1. **Apple Developer Program account ($99/yr)** — required by Apple for ANY iOS build / TestFlight. *(Currently the only blocker for an iPhone app.)*
2. **Google Play Console account** — for the Android release.
3. **Sports data + settlement feed** — MVP recommendation: SportsDataIO (+ The Odds API for line-setting signal); regulated-grade later: Sportradar or Genius Sports.
4. **KYC / age verification vendor** — Persona, Veriff or Jumio (~$1–2 per check).
5. **Geolocation vendor** — GeoComply or the KYC vendor's built-in geo (per-state compliance).
6. **Crypto / payments partner for Piety** — regulated partner (Zero Hash / Circle class) or client-owned chain infra; plus compliance counsel.
7. **Email/SMS sending accounts on your domain** — e.g. Postmark + Twilio (OTP, receipts).
8. **Legal & licensing counsel** — per-state pick'em/DFS availability.

## What WE provide (built & operated by the dev team)
- Backend API: accounts/auth, markets catalog, entries & settlement engine, wallet ledger, admin
- Projection engine (lines & multipliers built on top of the vendor feed)
- Push notifications (FCM/APNs via Expo — only needs your store accounts for certificates)
- Build, QA & preview pipeline (EAS, GitHub, test matrix) and web preview hosting

## Shared (decide before launch)
- Crash monitoring / analytics accounts (start on ours, hand over to yours)
- File storage (we recommend vendor-managed KYC storage so identity data never sits on our servers)

## Good news
Every vendor item is already wired behind specified interfaces with realistic test data in the current build — handing over keys later is integration work, not a rebuild.

## Fastest path to your iPhone review today
Without the Apple account: install **Expo Go** (App Store, free) and enter the preview URL we provide during a working session — full native app on your iPhone. With the Apple account: we ship TestFlight and you install from an email invite, anytime.
