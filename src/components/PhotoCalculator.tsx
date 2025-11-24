"use client";

import { useMemo, useState } from "react";

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

export default function PhotoCalculator() {
  const [shootType, setShootType] = useState<ShootType>("Yrityskuvaus");
  const [hours, setHours] = useState<number>(2);
  const [photos, setPhotos] = useState<number>(20);
  const [travelKm, setTravelKm] = useState<number>(0);
  const [includeRetouch, setIncludeRetouch] = useState<boolean>(true);

  const TRAVEL_PRICE_PER_KM = 0.8; // € / km
  const RETOUCH_FLAT = 40; // € 

  const config = PRICING[shootType];

  const { total, breakdown } = useMemo(() => {
    const base = config.base;
    const hoursPrice = hours * config.hourly;
    const photoPrice = photos * config.perPhoto;
    const travelPrice = travelKm * TRAVEL_PRICE_PER_KM;
    const retouchPrice = includeRetouch ? RETOUCH_FLAT : 0;

    const sum = base + hoursPrice + photoPrice + travelPrice + retouchPrice;

    return {
      total: sum,
      breakdown: {
        base,
        hoursPrice,
        photoPrice,
        travelPrice,
        retouchPrice,
      },
    };
  }, [config, hours, photos, travelKm, includeRetouch]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("fi-FI", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

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
        {/* Shoot type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Kuvaustyyppi
          </label>
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
                  Math.min(150, Math.max(5, Number(e.target.value) || 5)),
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

        {/* Travel & retouching */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Matka (km edestakaisin)
            </label>
            <input
              type="number"
              min={0}
              value={travelKm}
              onChange={(e) =>
                setTravelKm(Math.max(0, Number(e.target.value) || 0))
              }
              className="
                w-full rounded-lg border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900 px-3 py-2 text-sm
              "
            />
            <p className="text-xs text-zinc-500">
              + {TRAVEL_PRICE_PER_KM.toFixed(2)} €/km
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Sisältää kevyen peruseditoinnin
            </label>
            <button
              type="button"
              onClick={() => setIncludeRetouch((v) => !v)}
              className={`
                inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition
                ${
                  includeRetouch
                    ? "border-emerald-500/80 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/80 dark:text-emerald-300"
                    : "border-zinc-300/70 bg-zinc-50/50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200"
                }
              `}
            >
              <span
                className={`
                  inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px]
                  ${
                    includeRetouch
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-zinc-400 text-transparent"
                  }
                `}
              >
                ✓
              </span>
              <span>
                {includeRetouch ? "Kyllä" : "Ei, poista lisämaksu"} (
                {formatCurrency(RETOUCH_FLAT)})
              </span>
            </button>
          </div>
        </div>
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
                Valmiit kuvat ({photos} kpl ×{" "}
                {formatCurrency(config.perPhoto)}/kpl)
              </span>
              <span>{formatCurrency(breakdown.photoPrice)}</span>
            </div>
            {breakdown.travelPrice > 0 && (
              <div className="flex justify-between gap-4">
                <span>Matkakulut ({travelKm} km)</span>
                <span>{formatCurrency(breakdown.travelPrice)}</span>
              </div>
            )}
            {includeRetouch && (
              <div className="flex justify-between gap-4">
                <span>Peruseditointi</span>
                <span>{formatCurrency(breakdown.retouchPrice)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-zinc-200/70 dark:border-zinc-800 pt-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            Kun olet löytänyt sopivan paketin, voit lähettää tiedot minulle
            yhteydenottolomakkeen kautta. Laskurin valinnat voi liittää
            viestiin.
          </p>
        </div>
      </div>
    </div>
  );
}
