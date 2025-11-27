import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUPPORTED_LOCALES = ["fi", "en"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;

  const locale: SupportedLocale =
    rawLocale === "en" || rawLocale === "fi" ? rawLocale : "fi";

  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar locale={locale} />
      {children}
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
