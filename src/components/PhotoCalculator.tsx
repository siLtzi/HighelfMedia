"use client";

import { useEffect, useMemo, useState } from "react";

const SHOOT_TYPES = [
  "Yrityskuvaus",
  "Hääkuvaus",
  "Muotokuvaus",
  "Lapsi- ja perhekuvaus",
  "Rippi- ja valmistujaiskuvaus",
  "Asuntokuvaus",
  "Hautajaiskuvaus",
  "Eläinkuvaus",
] as const;

type ShootType = (typeof SHOOT_TYPES)[number];

// map Sanity/URL slug -> calculator type label
const SLUG_TO_TYPE: Record<string, ShootType> = {
  yrityskuvaus: "Yrityskuvaus",
  haakuvaus: "Hääkuvaus",
  muotokuvaus: "Muotokuvaus",
  "lapsi-ja-perhekuvaus": "Lapsi- ja perhekuvaus",
  "rippi-ja-valmistujaiskuvaus": "Rippi- ja valmistujaiskuvaus",
  asuntokuvaus: "Asuntokuvaus",
  hautajaiskuvaus: "Hautajaiskuvaus",
  elainkuvaus: "Eläinkuvaus",
};

const PRICING: Record<
  ShootType,
  { base: number; hourly: number; perPhoto: number }
> = {
  Yrityskuvaus: { base: 250, hourly: 120, perPhoto: 20 },
  Hääkuvaus: { base: 450, hourly: 140, perPhoto: 25 },
  Muotokuvaus: { base: 180, hourly: 90, perPhoto: 18 },
  "Lapsi- ja perhekuvaus": { base: 200, hourly: 100, perPhoto: 18 },
  "Rippi- ja valmistujaiskuvaus": { base: 180, hourly: 90, perPhoto: 18 },
  Asuntokuvaus: { base: 220, hourly: 110, perPhoto: 16 },
  Hautajaiskuvaus: { base: 260, hourly: 110, perPhoto: 18 },
  Eläinkuvaus: { base: 160, hourly: 80, perPhoto: 16 },
};

type ExtraOption = {
  id: string;
  label: string;
  description?: string;
  price: number;
};

const EXTRAS: Record<ShootType, ExtraOption[]> = {
  Yrityskuvaus: [],
  Hääkuvaus: [
    {
      id: "second-photographer",
      label: "Lisäkuvaaja",
      description:
        "Toinen kuvaaja tärkeimpiin hetkiin (esim. vihkiminen, potretit)",
      price: 200,
    },
  ],
  Muotokuvaus: [],
  "Lapsi- ja perhekuvaus": [],
  "Rippi- ja valmistujaiskuvaus": [],
  Asuntokuvaus: [
    {
      id: "aerial",
      label: "Ilmakuvat (drone)",
      description: "Ilmakuvaus talosta ja pihapiiristä",
      price: 120,
    },
    {
      id: "floorplan",
      label: "Pohjakuvat",
      description: "Selkeä pohjakuva ilmoitusta varten",
      price: 80,
    },
    {
      id: "twilight",
      label: "Iltakuvat / twilight-kuvaus",
      description: "Tunnelmalliset kuvat auringonlaskun jälkeen",
      price: 70,
    },
  ],
  Hautajaiskuvaus: [],
  Eläinkuvaus: [],
};

type PhotoCalculatorProps = {
  /** slug from the URL / Sanity, e.g. "yrityskuvaus" */
  serviceSlug?: string;
  /** if true, hide the type selector and lock to the mapped type */
  lockToService?: boolean;
};

export default function PhotoCalculator({
  serviceSlug,
  lockToService = false,
}: PhotoCalculatorProps) {
  const initialType: ShootType =
    (serviceSlug && SLUG_TO_TYPE[serviceSlug]) || "Yrityskuvaus";

  const [shootType, setShootType] = useState<ShootType>(initialType);
  const [hours, setHours] = useState<number>(2);
  const [photos, setPhotos] = useState<number>(20);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const config = PRICING[shootType];
  const typeExtras = EXTRAS[shootType] ?? [];

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

    const extrasForType = EXTRAS[shootType] ?? [];
    const extrasPrice = extrasForType
      .filter((e) => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);

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
  }, [config, hours, photos, selectedExtras, shootType]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fi-FI", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleSendToContact = () => {
    if (typeof window === "undefined") return;

    const extrasForType = EXTRAS[shootType] ?? [];
    const selected = extrasForType.filter((e) => selectedExtras.includes(e.id));

    const lines: string[] = [
      `Kuvaustyyppi: ${shootType}`,
      `Arvioitu hinta: ${formatCurrency(total)}`,
      "",
      `Kuvausaika: ${hours} h`,
      `Valmiit kuvat: ${photos} kpl`,
    ];

    if (selected.length) {
      lines.push("", "Lisäpalvelut:");
      for (const extra of selected) {
        lines.push(`- ${extra.label} (+${formatCurrency(extra.price)})`);
      }
    }

    const summary = lines.join("\n");

    // save for the contact form
    window.localStorage.setItem("highelf_quote", summary);

    // jump to contact section
    window.location.hash = "#contact";
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
            Kuvaustyyppi
          </label>

          {lockToService ? (
            <div className="inline-flex items-center rounded-full border border-zinc-300/70 dark:border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-200 bg-zinc-50/70 dark:bg-zinc-900/70">
              {shootType}
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {SHOOT_TYPES.map((type) => {
                const selected = type === shootType;
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
                    {type}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Hours */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Kuvaustunnit
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={1}
              max={10}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value) || 0)}
              className="w-full"
            />
            <input
              type="number"
              min={1}
              max={10}
              value={hours}
              onChange={(e) =>
                setHours(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
              }
              className="
                w-16 rounded-lg border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900 px-2 py-1 text-sm
              "
            />
            <span className="text-xs text-zinc-500">h</span>
          </div>
          <p className="text-xs text-zinc-500">
            Perushinta: {formatCurrency(config.base)} +{" "}
            {formatCurrency(config.hourly)}/h
          </p>
        </div>

        {/* Photos */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Valmiit kuvat (editoinnin jälkeen)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={photos}
              onChange={(e) => setPhotos(Number(e.target.value) || 0)}
              className="w-full"
            />
            <input
              type="number"
              min={5}
              max={150}
              value={photos}
              onChange={(e) =>
                setPhotos(
                  Math.min(150, Math.max(5, Number(e.target.value) || 5))
                )
              }
              className="
                w-20 rounded-lg border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900 px-2 py-1 text-sm
              "
            />
            <span className="text-xs text-zinc-500">kpl</span>
          </div>
          <p className="text-xs text-zinc-500">
            + {formatCurrency(config.perPhoto)}/kuva
          </p>
        </div>

        {/* Type-specific extras (real add-ons only, like drone / second shooter) */}
        {typeExtras.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Lisäpalvelut tälle kuvaukselle
            </label>
            <div className="grid gap-2 sm:grid-cols-2">
              {typeExtras.map((extra) => {
                const selected = selectedExtras.includes(extra.id);
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
                      {extra.label} (+{formatCurrency(extra.price)})
                    </span>
                    {extra.description && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {extra.description}
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
            Arvioitu hinta
          </h3>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {formatCurrency(total)}
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Lopullinen hinta tarkentuu tarjouksessa – tämä on suuntaa-antava
            laskuri.
          </p>

          <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
            <p>
              Laskuri auttaa hahmottamaan suuruusluokan. Kirjoita valinnat
              yhteydenottolomakkeeseen, niin teen tarkan tarjouksen – matkakulut
              ja erityistilanteet sovitaan aina erikseen.
            </p>
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
            Lisää valinnat yhteydenottolomakkeelle
          </button>

          <div className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <span>Peruspaketti</span>
              <span>{formatCurrency(breakdown.base)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>
                Kuvaus ({hours} h × {formatCurrency(config.hourly)}/h)
              </span>
              <span>{formatCurrency(breakdown.hoursPrice)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>
                Valmiit kuvat ({photos} kpl × {formatCurrency(config.perPhoto)}
                /kpl)
              </span>
              <span>{formatCurrency(breakdown.photoPrice)}</span>
            </div>
            {breakdown.extrasPrice > 0 && (
              <div className="flex justify-between gap-4">
                <span>Lisäpalvelut</span>
                <span>{formatCurrency(breakdown.extrasPrice)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            Laskuri auttaa hahmottamaan suuruusluokan. Kirjoita valinnat
            yhteydenottolomakkeeseen, niin teen tarkan tarjouksen – matkakulut
            ja erityistilanteet sovitaan aina erikseen.
          </p>
        </div>
      </div>
    </div>
  );
}
