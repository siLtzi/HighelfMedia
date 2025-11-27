"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import Reveal from "./Reveal";

export default function Contact({ locale }: { locale: string }) {
  const t = useTranslations("contact");
  const [message, setMessage] = useState("");
  const [calculatorDetails, setCalculatorDetails] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("highelf_quote");
    if (stored) {
      setCalculatorDetails(stored);
    }
  }, []);

  return (
    <section
      id="contact"
      className="
      min-h-screen flex items-center
      px-[clamp(16px,8vw,128px)] py-20
    "
    >
      <Container>
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="font-(--font-clash-display) text-5xl sm:text-6xl leading-tight">
                {t("title")}
              </h2>
              <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300 max-w-md">
                {t("desc")}
              </p>

              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
                {t("helper")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={24}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <input
                type="text"
                placeholder={t("name")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
                required
              />

              <input
                type="email"
                placeholder={t("email")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
                required
              />

              <input
                type="tel"
                placeholder={t("phone")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
                required
              />

              {calculatorDetails && (
                <div className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/5 dark:bg-zinc-800/40 px-4 py-3 text-xs text-zinc-700 dark:text-zinc-200">
                  <p className="font-semibold mb-1">{t("fromEstimator")}</p>
                  <pre className="whitespace-pre-wrap leading-relaxed">
                    {calculatorDetails}
                  </pre>
                </div>
              )}

              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("message")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
                required
              />

              <button
                type="submit"
                className="mt-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-3 text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                {t("submit")}
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
