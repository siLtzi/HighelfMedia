"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEstimatorStore, SiteType } from "../stores/useEstimatorStore";

const TYPE_KEYS: SiteType[] = [
  "business",
  "portfolio",
  "ecommerce",
  "booking",
  "custom",
];
const FEATURE_KEYS = [
  "blog",
  "gallery",
  "contact",
  "checkout",
  "booking",
  "multilingual",
  "seo",
  "cms",
] as const;
const DEADLINE_KEYS = ["normal", "fast", "rush"] as const;

export default function WebsiteEstimator() {
  const t = useTranslations("estimator");

  const [type, setType] = useState<SiteType>("business");
  const [pages, setPages] = useState(4);
  const [features, setFeatures] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<"normal" | "fast" | "rush">(
    "normal"
  );
  const setEstimator = useEstimatorStore().setEstimator;

  const basePrices: Record<SiteType, number> = {
    portfolio: 200,
    business: 300,
    ecommerce: 500,
    booking: 450,
    custom: 600,
  };
  const featurePrices: Record<string, number> = {
    blog: 80,
    gallery: 50,
    contact: 30,
    checkout: 100,
    booking: 120,
    multilingual: 100,
    seo: 60,
    cms: 80,
  };
  const multiplier =
    deadline === "normal" ? 1 : deadline === "fast" ? 1.2 : 1.5;

  const extras = useMemo(
    () => features.reduce((s, f) => s + (featurePrices[f] || 0), 0),
    [features]
  );
  const extraPages = useMemo(() => Math.max(pages - 1, 0) * 40, [pages]);
  const total = useMemo(
    () => Math.round((basePrices[type] + extraPages + extras) * multiplier),
    [type, extraPages, extras, multiplier]
  );

  useEffect(
    () => setEstimator({ type, pages, features, deadline, total }),
    [type, pages, features, deadline, total, setEstimator]
  );

  const toggleFeature = (f: string) =>
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  const deadlineLabel = (d: typeof deadline) => t(`options.deadline.${d}`);

  const featuresPretty = features.length
    ? features
        .map((f) => t(`options.features.${f as (typeof FEATURE_KEYS)[number]}`))
        .join(", ")
    : t("breakdown.none");

  return (
    <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 bg-white/10 dark:bg-zinc-900/40 backdrop-blur-xl border border-white/10 dark:border-zinc-800/50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight">{t("title")}</h3>
        <div className="flex gap-2 text-[10px] sm:text-xs">
        </div>
      </div>

      {/* Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {t("fields.type")}
        </label>
        <select
          className="w-full rounded-xl bg-white/20 dark:bg-zinc-800/60 border border-white/10 dark:border-zinc-700/40 p-2.5 text-sm cursor-pointer"
          value={type}
          onChange={(e) => setType(e.target.value as SiteType)}
        >
          {TYPE_KEYS.map((k) => (
            <option key={k} value={k}>
              {t(`options.type.${k}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Pages */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          {t("fields.pages")}{" "}
          <span className="ml-1 text-xs text-zinc-500">({pages})</span>
        </label>
        <input
          type="range"
          min={1}
          max={15}
          value={pages}
          onChange={(e) => setPages(Number(e.target.value))}
          className="w-full cursor-pointer accent-zinc-700 dark:accent-zinc-300"
        />
      </div>

      {/* Features */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2">
          {t("fields.features")}
        </label>
        <div className="flex flex-wrap gap-2">
          {FEATURE_KEYS.map((f) => {
            const active = features.includes(f);
            return (
              <label
                key={f}
                className={`relative cursor-pointer rounded-full px-3 py-1.5 text-xs sm:text-sm border transition-all
                     ${
                       active
                         ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-transparent"
                         : "bg-white/10 dark:bg-zinc-800/40 hover:bg-white/20 border-white/10 dark:border-zinc-700/40"
                     }`}
              >
                <input
                  type="checkbox"
                  checked={active}
                  onChange={() => toggleFeature(f)}
                  className="sr-only"
                />
                <span>{t(`options.features.${f}`)}</span>
              </label>
            );
          })}
        </div>
        <div className="mt-2 text-[11px] text-zinc-500">
          {t("helper.featuresTip")}
        </div>
      </div>

      {/* Deadline */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t("fields.deadline")}
        </label>
        <div className="relative grid grid-cols-3 rounded-xl bg-white/10 dark:bg-zinc-800/40 p-1">
          {DEADLINE_KEYS.map((d, i) => (
            <button
              key={d}
              onClick={() => setDeadline(d)}
              className={`relative z-10 rounded-lg px-3 py-2 text-sm cursor-pointer ${
                deadline === d
                  ? "text-zinc-900 dark:text-zinc-900"
                  : "text-zinc-200/80"
              }`}
            >
              {t(`options.deadline.${d}`)}
            </button>
          ))}
          <div
            aria-hidden
            className="absolute inset-y-1 w-1/3 rounded-lg bg-white left-1 transition-[left] duration-200 ease-out"
            style={{
              left:
                deadline === "normal"
                  ? "0.25rem"
                  : deadline === "fast"
                  ? "calc(33.333% + 0.25rem)"
                  : "calc(66.666% + 0.25rem)",
            }}
          />
        </div>
      </div>

      {/* Breakdown */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm text-zinc-300/90 hover:text-white transition">
          {t("breakdown.see")}
        </summary>
        <div className="mt-2 rounded-xl border border-white/10 dark:border-zinc-700/40 bg-white/5 dark:bg-zinc-800/30 p-3 text-sm">
          <div className="flex justify-between py-1">
            <span>
              {t("breakdown.base", { type: t(`options.type.${type}`) })}
            </span>
            <span>€{basePrices[type]}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>
              {t("breakdown.extraPages", { count: Math.max(pages - 1, 0) })}
            </span>
            <span>€{extraPages}</span>
          </div>
          <div className="flex justify-between py-1">
            <span>
              {t("breakdown.features", {
                list: features.length
                  ? `(${featuresPretty})`
                  : t("breakdown.none"),
              })}
            </span>
            <span>€{extras}</span>
          </div>
          <div className="mt-2 h-px bg-white/10 dark:bg-zinc-700/40" />
          <div className="flex justify-between py-2">
            <span>{t("breakdown.multiplier")}</span>
            <span>{multiplier}×</span>
          </div>
        </div>
      </details>

      {/* Total */}
      <div className="rounded-2xl bg-white dark:bg-zinc-100 text-zinc-900 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            {t("total.label")}
          </p>
          <p className="text-3xl font-bold leading-tight">€{total}</p>
        </div>
        <Link
          href="#contact"
          className="rounded-xl bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          {t("cta")}
        </Link>
      </div>
      <p className="mt-2 text-[11px] text-zinc-500">{t("total.approxNote")}</p>
    </div>
  );
}
