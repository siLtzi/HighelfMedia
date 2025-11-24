"use client";
import { create } from "zustand";

export type SiteType = "portfolio" | "business" | "ecommerce" | "booking" | "custom";
export type Deadline = "normal" | "fast" | "rush";

export type EstimatorState = {
  type: SiteType;
  pages: number;
  features: string[];
  deadline: Deadline;
  total: number;
  setEstimator: (p: Partial<Omit<EstimatorState, "setEstimator">>) => void;
};

export const useEstimatorStore = create<EstimatorState>((set) => ({
  type: "business",
  pages: 4,
  features: [],
  deadline: "normal",
  total: 0,
  setEstimator: (p) => set((s) => ({ ...s, ...p })),
}));
