/**
 * Minimal root layout — required by Next.js App Router.
 * The actual <html> and <body> shell (with locale, fonts, providers)
 * lives in app/[locale]/layout.tsx.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
