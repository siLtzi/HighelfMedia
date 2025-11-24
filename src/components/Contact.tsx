"use client";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "./Container";
import Reveal from "./Reveal";
import { useEstimatorStore } from "../stores/useEstimatorStore";

export default function Contact({ locale }: { locale: "fi" | "en" }) {
  const t = useTranslations("contact");
  const est = useEstimatorStore();
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false); // user has typed -> stop auto-updating

  const prefill = useMemo(() => {
    const featuresPretty = est.features.length ? est.features.map(f => f[0].toUpperCase() + f.slice(1)).join(", ") : "None";
    const deadlinePretty = est.deadline === "normal" ? "Normal" : est.deadline === "fast" ? "Fast" : "Rush";
    return [
      `Project type: ${est.type}`,
      `Pages: ${est.pages}`,
      `Features: ${featuresPretty}`,
      `Deadline: ${deadlinePretty}`,
      `Estimated total: €${est.total}`,
      "",
      "Tell us more about your project:"
    ].join("\n");
  }, [est.type, est.pages, est.features, est.deadline, est.total]);

  useEffect(() => {
    if (!dirty) setMessage(prefill);
  }, [prefill, dirty]);

  return (
    <section id="contact" className="min-h-screen flex items-center px-[clamp(16px,8vw,128px)] py-20">
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

              {/* small summary pills */}
              <div className="mt-6 flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  {est.type}
                </span>
                <span className="px-2 py-1 rounded-full bg-zinc-800 text-white/90 dark:bg-zinc-200 dark:text-zinc-900">
                  {est.pages} pages
                </span>
                <span className="px-2 py-1 rounded-full bg-zinc-700 text-white/80 dark:bg-zinc-300 dark:text-zinc-900">
                  {est.deadline}
                </span>
                <span className="px-2 py-1 rounded-full bg-zinc-600 text-white/80 dark:bg-zinc-400 dark:text-zinc-900">
                  €{est.total}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} y={24}>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 w-full max-w-md">
              {/* hidden fields sent alongside the message for easy parsing on backend */}
              <input type="hidden" name="estimator_type" value={est.type} />
              <input type="hidden" name="estimator_pages" value={est.pages} />
              <input type="hidden" name="estimator_features" value={est.features.join(",")} />
              <input type="hidden" name="estimator_deadline" value={est.deadline} />
              <input type="hidden" name="estimator_total" value={est.total} />

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
              <textarea
                rows={5}
                value={message}
                onChange={(e) => { setDirty(true); setMessage(e.target.value); }}
                placeholder={t("message")}
                className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/10 dark:bg-zinc-800/30 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400/50"
                required
              />

              <button
                type="submit"
                className="mt-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 py-3 text-sm font-medium hover:opacity-90 transition"
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
