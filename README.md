# DevUtils

An all-in-one developer toolkit — fast, client-side utilities for everyday development tasks. Free tools run entirely in your browser with no sign-up required. Pro tools unlock with a subscription.

**Live:** [dev-utils-rose.vercel.app](https://dev-utils-rose.vercel.app)

---

## Features

- Instant results as you type — no submit buttons
- Dark mode support
- Command palette (`Ctrl+K`) to search and jump to any tool
- Google OAuth + email/password authentication
- Pro plan via Stripe for premium tools
- Sidebar navigation with session-aware user UI

---

## Supported Tools

### Free

| Tool | Description |
|------|-------------|
| JSON Formatter | Format and validate JSON |
| YAML ↔ JSON | Convert between YAML and JSON |
| Base64 Encoder/Decoder | Encode and decode Base64 strings |
| URL Encoder/Decoder | Encode and decode URL components |
| HTML Encoder/Decoder | Escape and unescape HTML entities |
| UUID Generator | Generate random UUIDs (v4) |
| Hash Generator | Generate MD5, SHA-1, SHA-256, SHA-512 hashes |
| JWT Decoder | Decode and inspect JWT tokens |
| Regex Tester | Test regular expressions with live matching |
| Diff Checker | Compare two blocks of text |
| Timestamp Converter | Convert between Unix timestamps and human-readable dates |

### Pro

| Tool | Description |
|------|-------------|
| SQL Formatter | Format and beautify SQL queries |

---

## Stack

- **Next.js 16** (App Router) + TypeScript + React 19
- **Tailwind CSS v4**
- **NextAuth v5** — Google OAuth + email/password
- **Prisma 7** + PostgreSQL (Neon)
- **Stripe** — subscription billing
- Deployed on **Vercel**

---

## Local Setup

### Prerequisites

- Node.js 20+
- PostgreSQL database (or a [Neon](https://neon.tech) serverless instance)
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com))
- Stripe account ([stripe.com](https://stripe.com))

### 1. Clone and install

```bash
git clone https://github.com/your-username/devutils.git
cd devutils
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
AUTH_SECRET=           # generate with: npx auth secret
AUTH_URL=http://localhost:3000
DATABASE_URL=          # your PostgreSQL connection string

GOOGLE_CLIENT_ID=      # from Google Cloud Console
GOOGLE_CLIENT_SECRET=  # from Google Cloud Console

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_PRICE_ID=
STRIPE_WEBHOOK_SECRET= # from Stripe CLI listener
```

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Stripe webhook (for Pro plan)

Run the Stripe CLI to forward webhook events locally:

```bash
docker run --rm -it stripe/stripe-cli listen \
  --api-key YOUR_STRIPE_SECRET_KEY \
  --forward-to host.docker.internal:3000/api/webhooks/stripe
```

Copy the `whsec_...` key printed in the terminal and set it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

---

## Scripts

```bash
npm run dev      # Start dev server (Turbopack, localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
