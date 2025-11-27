"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react";
import { useTranslations } from "next-intl";

const SHOOT_TYPES = [
  "yrityskuvaus",
  "haakuvaus",
  "muotokuvaus",
  "lapsi-ja-perhekuvaus",
  "rippi-ja-valmistujaiskuvaus",
  "asuntokuvaus",
  "hautajaiskuvaus",
  "elainkuvaus",
] as const;

type ShootType = (typeof SHOOT_TYPES)[number];

// map Sanity/URL slug -> internal type slug (same for now, but flexible)
const SLUG_TO_TYPE: Record<string, ShootType> = {
  yrityskuvaus: "yrityskuvaus",
  haakuvaus: "haakuvaus",
  muotokuvaus: "muotokuvaus",
  "lapsi-ja-perhekuvaus": "lapsi-ja-perhekuvaus",
  "rippi-ja-valmistujaiskuvaus": "rippi-ja-valmistujaiskuvaus",
  asuntokuvaus: "asuntokuvaus",
  hautajaiskuvaus: "hautajaiskuvaus",
  elainkuvaus: "elainkuvaus",
};

type ExtraOption = {
  id: string;
  price: number;
};

type PricingEntry = {
  base: number;
  hourly: number;
  perPhoto: number;
  extras: ExtraOption[];
};

// ✅ Built-in fallback pricing (used if no Sanity pricing is passed)
const PRICING_FALLBACK: Record<
  ShootType,
  { base: number; hourly: number; perPhoto: number }
> = {
  yrityskuvaus: { base: 250, hourly: 120, perPhoto: 20 },
  haakuvaus: { base: 450, hourly: 140, perPhoto: 25 },
  muotokuvaus: { base: 180, hourly: 90, perPhoto: 18 },
  "lapsi-ja-perhekuvaus": { base: 200, hourly: 100, perPhoto: 18 },
  "rippi-ja-valmistujaiskuvaus": { base: 180, hourly: 90, perPhoto: 18 },
  asuntokuvaus: { base: 220, hourly: 110, perPhoto: 16 },
  hautajaiskuvaus: { base: 260, hourly: 110, perPhoto: 18 },
  elainkuvaus: { base: 160, hourly: 80, perPhoto: 16 },
};

const EXTRAS_FALLBACK: Record<ShootType, ExtraOption[]> = {
  yrityskuvaus: [],
  haakuvaus: [
    {
      id: "second-photographer",
      price: 200,
    },
  ],
  muotokuvaus: [],
  "lapsi-ja-perhekuvaus": [],
  "rippi-ja-valmistujaiskuvaus": [],
  asuntokuvaus: [
    {
      id: "aerial",
      price: 120,
    },
    {
      id: "floorplan",
      price: 80,
    },
    {
      id: "twilight",
      price: 70,
    },
  ],
  hautajaiskuvaus: [],
  elainkuvaus: [],
};

type PricingMap = Record<string, PricingEntry>;

type PhotoCalculatorProps = {
  serviceSlug?: string;
  lockToService?: boolean;
  pricing?: PricingMap;
};

export default function PhotoCalculator({
  serviceSlug,
  lockToService = false,
  pricing,
}: PhotoCalculatorProps) {
  const tEstimator = useTranslations("estimator");
  const tServices = useTranslations("services");

  const initialType: ShootType =
    (serviceSlug && SLUG_TO_TYPE[serviceSlug]) || "yrityskuvaus";

  const [shootType, setShootType] = useState<ShootType>(initialType);
  const [hours, setHours] = useState<number>(2);
  const [photos, setPhotos] = useState<number>(20);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // 🔧 merge Sanity pricing (if provided) with fallback
  const override = pricing?.[shootType];
  const config = {
    base: override?.base ?? PRICING_FALLBACK[shootType].base,
    hourly: override?.hourly ?? PRICING_FALLBACK[shootType].hourly,
    perPhoto: override?.perPhoto ?? PRICING_FALLBACK[shootType].perPhoto,
  };
  const typeExtras: ExtraOption[] =
    override?.extras ?? EXTRAS_FALLBACK[shootType] ?? [];

  // reset extras when type changes
  useEffect(() => {
    setSelectedExtras([]);
  }, [shootType]);

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const { total, breakdown } = useMemo(() => {
    const base = config.base;
    const hoursPrice = hours * config.hourly;
    const photoPrice = photos * config.perPhoto;

    const extrasPrice = typeExtras
      .filter((e) => selectedExtras.includes(e.id))
      .reduce(
        (sum: number, extra: ExtraOption) => sum + extra.price,
        0
      );

    const sum = base + hoursPrice + photoPrice + extrasPrice;

    return {
      total: sum,
      breakdown: {
        base,
        hoursPrice,
        photoPrice,
        extrasPrice,
      },
    };
  }, [config.base, config.hourly, config.perPhoto, hours, photos, selectedExtras, typeExtras]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fi-FI", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleSendToContact = () => {
    if (typeof window === "undefined") return;

    const selected = typeExtras.filter((e) =>
      selectedExtras.includes(e.id)
    );

    const typeLabel = tServices(`labels.${shootType}` as any);

    const lines: string[] = [
      tEstimator("summary.type", { type: typeLabel }),
      tEstimator("summary.estimatedPrice", {
        price: formatCurrency(total),
      }),
      "",
      `${tEstimator("fields.hours")}: ${hours} ${tEstimator("units.hours")}`,
      `${tEstimator("fields.photos")}: ${photos} ${tEstimator("units.photos")}`,
    ];

    if (selected.length) {
      lines.push("", tEstimator("summary.extrasTitle"));
      for (const extra of selected) {
        const label = tEstimator(
          `extras.${shootType}.${extra.id}.label` as any
        );
        lines.push(
          tEstimator("summary.extraLine", {
            label,
            price: formatCurrency(extra.price),
          })
        );
      }
    }

    const summary = lines.join("\n");

    window.localStorage.setItem("highelf_quote", summary);
    window.location.hash = "#contact";
    console.log("PRICING FROM SANITY:", pricing);
console.log("SERVICE TYPE:", shootType);
console.log("USING CONFIG:", pricing?.[shootType]);

  };

  return (
    <div
      className="
        mt-10 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]
        rounded-2xl border border-zinc-200/60 dark:border-zinc-800
        bg-white/70 dark:bg-zinc-900/80 backdrop-blur
        p-6 sm:p-8 shadow-sm
      "
    >
      {/* LEFT: controls */}
      <div className="space-y-6">
        {/* Shoot type selector or label */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {tEstimator("fields.type")}
          </label>

          {lockToService ? (
            <div className="inline-flex items-center rounded-full border border-zinc-300/70 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-50/70 dark:bg-zinc-900/70">
              {tServices(`labels.${shootType}` as any)}
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {SHOOT_TYPES.map((type) => {
                const selected = type === shootType;
                const label = tServices(`labels.${type}` as any);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setShootType(type)}
                    className={`
                      text-left text-sm rounded-xl border px-3 py-2.5
                      transition
                      ${
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-200/70 bg-zinc-50/60 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 hover:border-zinc-400/80"
                      }
                    `}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hours */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {tEstimator("fields.hours")}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={16}
              value={hours}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHours(Number(e.target.value) || 0)
              }
              className="w-full"
            />
            <input
              type="number"
              min={1}
              max={16}
              value={hours}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setHours(
                  Math.min(
                    16,
                    Math.max(1, Number(e.target.value) || 1)
                  )
                )
              }
              className="
                w-16 rounded-lg border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900 px-2 py-1 text-sm
              "
            />
            <span className="text-xs text-zinc-500">
              {tEstimator("units.hours")}
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            {tEstimator("helper.baseLine", {
              base: formatCurrency(config.base),
              hourly: formatCurrency(config.hourly),
            })}
          </p>
        </div>

        {/* Photos */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {tEstimator("fields.photos")}
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={photos}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhotos(Number(e.target.value) || 0)
              }
              className="w-full"
            />
            <input
              type="number"
              min={5}
              max={150}
              value={photos}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhotos(
                  Math.min(
                    150,
                    Math.max(5, Number(e.target.value) || 5)
                  )
                )
              }
              className="
                w-20 rounded-lg border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900 px-2 py-1 text-sm
              "
            />
            <span className="text-xs text-zinc-500">
              {tEstimator("units.photos")}
            </span>
          </div>
          <p className="text-xs text-zinc-500">
            {tEstimator("helper.perPhotoLine", {
              rate: formatCurrency(config.perPhoto),
            })}
          </p>
        </div>

        {/* Type-specific extras */}
        {typeExtras.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {tEstimator("breakdown.extrasLabel")}
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {typeExtras.map((extra) => {
                const selected = selectedExtras.includes(extra.id);
                const label = tEstimator(
                  `extras.${shootType}.${extra.id}.label` as any
                );
                const description = tEstimator(
                  `extras.${shootType}.${extra.id}.description` as any
                );

                return (
                  <button
                    key={extra.id}
                    type="button"
                    onClick={() => toggleExtra(extra.id)}
                    className={`
                      text-left text-sm rounded-xl border px-3 py-2.5
                      transition flex flex-col gap-1
                      ${
                        selected
                          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                          : "border-zinc-200/70 bg-zinc-50/60 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200 hover:border-zinc-400/80"
                      }
                    `}
                  >
                    <span className="font-medium">
                      {label} (+{formatCurrency(extra.price)})
                    </span>
                    {description && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT: summary */}
      <div
        className="
          rounded-2xl border border-zinc-200/70 dark:border-zinc-800
          bg-zinc-50/70 dark:bg-zinc-950/70 p-5 sm:p-6
          flex flex-col justify-between
        "
      >
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {tEstimator("total.label")}
          </h3>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {formatCurrency(total)}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {tEstimator("total.approxNote")}
          </p>

          <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
            <p>{tEstimator("helper.summary")}</p>
          </div>

          <button
            type="button"
            onClick={handleSendToContact}
            className="
              mt-4 w-full rounded-xl border border-zinc-300 dark:border-zinc-700
              text-sm px-4 py-2.5
              hover:bg-zinc-100 dark:hover:bg-zinc-900/60
              transition cursor-pointer
            "
          >
            {tEstimator("cta")}
          </button>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span>{tEstimator("breakdown.baseLabel")}</span>
              <span>{formatCurrency(breakdown.base)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>
                {tEstimator("breakdown.hoursLabel", {
                  hours,
                  rate: formatCurrency(config.hourly),
                })}
              </span>
              <span>{formatCurrency(breakdown.hoursPrice)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>
                {tEstimator("breakdown.photosLabel", {
                  count: photos,
                  rate: formatCurrency(config.perPhoto),
                })}
              </span>
              <span>{formatCurrency(breakdown.photoPrice)}</span>
            </div>
            {breakdown.extrasPrice > 0 && (
              <div className="flex justify-between gap-4">
                <span>{tEstimator("breakdown.extrasLabel")}</span>
                <span>{formatCurrency(breakdown.extrasPrice)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>{tEstimator("helper.summary")}</p>
        </div>
      </div>
    </div>
  );
}
