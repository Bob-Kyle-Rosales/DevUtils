# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server (Turbopack, localhost:3000)
npm run build     # Production build (Turbopack by default)
npm run start     # Start production server
npm run lint      # Run ESLint (next build no longer runs lint automatically)
```

No test runner is configured yet.

## Project: DevUtils — All-in-one Developer Toolkit

A fast web app with developer utilities. No sign-up required for free tools.

### Stack

- **Next.js 16** (App Router) + TypeScript + React 19.2
- **Tailwind CSS v4** (configured via `@import "tailwindcss"` + `@theme inline` in CSS, not `tailwind.config.js`)
- CodeMirror 6 for code editors
- Python FastAPI on Railway (AI Pro tools)
- PostgreSQL + Prisma (auth + history)
- NextAuth v5 (GitHub + Google OAuth)
- Stripe (Pro plan)

### Planned file structure

- `app/tools/[slug]/page.tsx` — each tool gets its own route
- `components/tools/` — individual tool components
- `components/layout/` — sidebar, topbar, search
- `lib/tools/` — tool logic (pure functions, no UI)
- `@/*` path alias maps to the project root

### Design rules

- Tools run client-side only (no server calls for free tools)
- Every tool reacts instantly as user types — no submit buttons
- Each tool has: Input panel | Output panel | Copy button | Sample button
- Sidebar navigation + cmd+K search palette
- Dark mode via Tailwind (CSS variables in `app/globals.css`)

## Next.js 16 breaking changes

These differ from training-data knowledge of Next.js 15 and earlier:

**Async-only Request APIs** — `cookies()`, `headers()`, `draftMode()`, `params`, and `searchParams` are now async-only. Synchronous access was removed. Always `await` them. Use `npx next typegen` for `PageProps`/`LayoutProps`/`RouteContext` helpers.

**`middleware` renamed to `proxy`** — The `middleware.ts` file and its named export are deprecated; rename to `proxy.ts` exporting `proxy`. The edge runtime is NOT supported in `proxy` (use nodejs). Config flags like `skipMiddlewareUrlNormalize` → `skipProxyUrlNormalize`.

**Linting** — `next lint` command is removed. Use `npm run lint` (ESLint CLI directly). `next build` no longer lints. ESLint config uses flat config (`eslint.config.mjs`).

**Turbopack is default** — `next dev` and `next build` use Turbopack. Opt out with `--webpack`. Custom webpack config in `next.config.ts` breaks the build unless you use `--webpack`.

**`revalidateTag` requires second arg** — `revalidateTag('tag', 'max')` — single-arg form is deprecated. Use `updateTag` for immediate invalidation in Server Actions.

**`cacheLife`/`cacheTag`** — Stable, drop the `unstable_` prefix.

**`experimental.ppr` removed** — Use `cacheComponents: true` in `next.config.ts` for PPR (now renamed).

**Parallel routes** — All `@slot` directories require an explicit `default.js`; builds fail without them.

**`serverRuntimeConfig`/`publicRuntimeConfig` removed** — Use `process.env` and `NEXT_PUBLIC_` prefix.

**`next/legacy/image` deprecated** — Use `next/image`.

**`images.domains` deprecated** — Use `images.remotePatterns`.

**Turbopack config** — `experimental.turbopack` moved to top-level `turbopack` in `next.config.ts`.

**AMP removed** — All AMP APIs and config options are gone.

**Separate dev/build output** — `next dev` outputs to `.next/dev`; `next build` outputs to `.next`.

**`next build` output** — `size` and `First Load JS` metrics removed from build output.
