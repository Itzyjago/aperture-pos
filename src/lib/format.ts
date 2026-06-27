import type { Unit } from "../data/types";

const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const usd2 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const num = new Intl.NumberFormat("en-US");

export function compactUsd(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return usd0.format(n);
}

export function formatValue(n: number, unit: Unit): string {
  switch (unit) {
    case "currency":
      return n >= 10_000 ? compactUsd(n) : usd2.format(n);
    case "percent":
      return `${n.toFixed(1)}%`;
    case "decimal":
      return n.toFixed(2);
    case "number":
    default:
      return num.format(n);
  }
}

export const fmtUsd = (n: number) => usd0.format(n);
export const fmtUsd2 = (n: number) => usd2.format(n);
export const fmtNum = (n: number) => num.format(n);
export const fmtPct = (n: number) => `${n.toFixed(1)}%`;
export const signed = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
