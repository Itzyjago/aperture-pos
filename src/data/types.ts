export type Unit = "currency" | "number" | "percent" | "decimal";

export interface Kpi {
  key: string;
  label: string;
  value: number;
  unit: Unit;
  delta: number;
  target: number;
  spark: number[];
  hint: string;
  invert?: boolean;
}

export interface Store {
  id: string;
  name: string;
  region: string;
  manager: string;
  sqft: number;
  netSales: number;
  transactions: number;
  avgBasket: number;
  conversion: number;
  registersOnline: number;
  registersTotal: number;
  target: number;
  status: "healthy" | "attention" | "offline-lane";
}

export interface TrendPoint {
  day: string;
  label: string;
  netSales: number;
  target: number;
  transactions: number;
  lastYear: number;
}

export interface NamedValue {
  name: string;
  value: number;
  revenue?: number;
}

export interface HourPoint {
  hour: string;
  sales: number;
  traffic: number;
}

export interface Sku {
  sku: string;
  name: string;
  category: string;
  units: number;
  revenue: number;
  margin: number;
  trend: number;
}

export interface RegionPerf {
  region: string;
  netSales: number;
  transactions: number;
  stores: number;
}

export interface FeedItem {
  id: number;
  store: string;
  type: "sale" | "alert" | "warn";
  text: string;
  ago: string;
}

export interface Meta {
  company: string;
  product: string;
  period: string;
  generatedAt: string;
  storesOnline: number;
  storesTotal: number;
}

export interface ApertureData {
  meta: Meta;
  stores: Store[];
  kpis: Kpi[];
  salesTrend: TrendPoint[];
  categoryMix: NamedValue[];
  hourlySales: HourPoint[];
  paymentMix: NamedValue[];
  topSkus: Sku[];
  regionPerf: RegionPerf[];
  liveFeed: FeedItem[];
}
