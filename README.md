# bar-for-descope

An ad-hoc, personalized job-application page Bar Moshe built for the **Full-Stack
Software Engineer** role at **Descope** (Tel Aviv, hybrid), in Descope's real
visual language, read live off descope.com: a near-black navy hero (#0A101A) with
a radial glow, white display type at weight 500 with a mint (#7DEDED) underline
highlight, mint CTA pills, and Descope's signature "identity-journey" flow builder
rebuilt from scratch as Bar's own ship pipeline (Brief → Frontend → Full-stack →
Shipped).

The page presents Bar as a marketing site for himself: a frontend-first full-stack
engineer who ships developer tools, with the live proof (MDP on npm + an MCP
server, a Temporal plugin, real-time React work, and a Temporal Code Exchange
feature) mapped to the role.

Not affiliated with Descope. `robots: noindex` — a private, shareable link.
Standalone sibling repo matching the `bar-for-*` application-site pattern.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped under `.dsc-root`) + GSAP (ScrollTrigger, reveals only)
- `next/og` share card (`app/opengraph-image.tsx`)
- Motion is CSS + SVG, gated on `prefers-reduced-motion`; legible with no JS

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint (jsx-a11y gate)
```
