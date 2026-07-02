import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import DescopeApp from "@/src/marketing/descope/DescopeApp";

// Type trio for the Descope application page, matched to the live site:
// descope.com sets display + body in Roobert (commercial). Hanken Grotesk is
// the free near-match for the display cut at weight 500, Inter for the body,
// JetBrains Mono for the flow / node labels. Exposed as --font-dsc-* for
// descope.css.
const display = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dsc-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dsc-body",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dsc-mono",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Full-Stack Software
// Engineer" application to Descope (Tel Aviv, hybrid). Speaks Descope's own
// language (developer-first customer + agentic identity: visual identity
// journeys, MFA/SSO, MCP-server and AI-agent auth) and makes the case for Bar
// inside it. Standalone sibling built in Descope's real brand, read live off
// descope.com. Noindex, a private shareable link for the Descope team.
const ogTitle = "Bar Moshe × Descope — Full-Stack Software Engineer";
const ogDescription =
  "Bar Moshe, a full-stack software engineer in Tel Aviv. React, Next.js, TypeScript, Node; open-source developer tooling on npm with an MCP server; featured on Temporal's Code Exchange.";

// noindex (private, shareable link) but a rich share card still renders for
// direct shares (email / DM / LinkedIn); og:image comes from the colocated
// opengraph-image.tsx.
export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function DescopePage() {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <DescopeApp />
    </div>
  );
}
