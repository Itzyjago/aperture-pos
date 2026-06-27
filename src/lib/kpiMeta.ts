import type { ComponentType } from "react";
import {
  IcDollar,
  IcReceipt,
  IcBasket,
  IcMargin,
  IcUsers,
  IcLayers,
  IcRuler,
  IcShield,
} from "../components/Icons";

export const KPI_META: Record<string, { icon: ComponentType<{ className?: string }>; accent: string }> = {
  net_sales: { icon: IcDollar, accent: "#5b8def" },
  transactions: { icon: IcReceipt, accent: "#7aa6ff" },
  avg_basket: { icon: IcBasket, accent: "#34d8c0" },
  gross_margin: { icon: IcMargin, accent: "#9b7bf0" },
  conversion: { icon: IcUsers, accent: "#f5b14c" },
  units_txn: { icon: IcLayers, accent: "#5b8def" },
  sales_sqft: { icon: IcRuler, accent: "#34d8c0" },
  shrinkage: { icon: IcShield, accent: "#f1657e" },
};

export const fallbackMeta = { icon: IcDollar, accent: "#5b8def" };
