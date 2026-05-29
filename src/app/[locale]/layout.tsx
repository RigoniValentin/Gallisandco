import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

function hasLocale(locales: readonly string[], locale: string | undefined): locale is string {
  return typeof locale === "string" && (locales as string[]).includes(locale);
}
import { Playfair_Display, Inter } from "next/font/google";
import { routing } from "../../../i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "../globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Inter as a faithful proxy for Google Sans (which is not licensed for web).
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gallisandco.com"),
  title: {
    default: "Galli's & Co. — Global Mobility & Solutions",
    template: "%s | Galli's & Co.",
  },
  description:
    "International legal firm specialized in citizenship, residency and global mobility. Strategic guidance with a human compass.",
  openGraph: {
    siteName: "Galli's & Co.",
    url: "https://gallisandco.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar overDark />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
