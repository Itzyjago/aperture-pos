// Bundled deterministic snapshot — mirrors server/data/seed.js so the UI
// renders instantly and never blanks. The live Node API serves the same shape;
// the app prefers the API and falls back to this snapshot.
import type { ApertureData } from "./types";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(20260627);
const rand = (min: number, max: number) => min + (max - min) * rng();
const randInt = (min: number, max: number) => Math.round(rand(min, max));
const round = (n: number, d = 0) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};

const STORE_DEFS = [
  { id: "ST-01", name: "Flagship · Madison Ave", region: "Northeast", manager: "D. Okafor", sqft: 8400 },
  { id: "ST-02", name: "Lincoln Park", region: "Midwest", manager: "R. Bianchi", sqft: 5200 },
  { id: "ST-03", name: "Pearl District", region: "West", manager: "S. Nakamura", sqft: 4600 },
  { id: "ST-04", name: "South Congress", region: "South", manager: "M. Alvarez", sqft: 3900 },
  { id: "ST-05", name: "Buckhead Galleria", region: "South", manager: "T. Whitfield", sqft: 6100 },
  { id: "ST-06", name: "Bellevue Square", region: "West", manager: "J. Park", sqft: 5500 },
] as const;

const stores: ApertureData["stores"] = STORE_DEFS.map((s, i) => {
  const perSqft = rand(58, 96);
  const netSales = round(s.sqft * perSqft);
  const transactions = randInt(180, 520);
  const status = (i === 3 ? "attention" : i === 5 ? "offline-lane" : "healthy") as ApertureData["stores"][number]["status"];
  return {
    ...s,
    netSales,
    transactions,
    avgBasket: round(netSales / transactions, 2),
    conversion: round(rand(18, 34), 1),
    registersOnline: i === 5 ? 5 : randInt(6, 9),
    registersTotal: i === 5 ? 7 : 9,
    target: round(netSales * rand(0.92, 1.12)),
    status,
  };
});

function spark(base: number, vol: number, n = 16, up = true) {
  const out: number[] = [];
  let v = base;
  for (let i = 0; i < n; i++) {
    v += (rng() - (up ? 0.42 : 0.58)) * vol;
    out.push(round(Math.max(v, base * 0.5), 2));
  }
  return out;
}

const netSalesTotal = stores.reduce((a, s) => a + s.netSales, 0);
const txnTotal = stores.reduce((a, s) => a + s.transactions, 0);
const sqftTotal = stores.reduce((a, s) => a + s.sqft, 0);

const kpis: ApertureData["kpis"] = [
  { key: "net_sales", label: "Net Sales", value: netSalesTotal, unit: "currency", delta: 8.4, target: round(netSalesTotal * 1.05), spark: spark(netSalesTotal / 16, netSalesTotal / 40), hint: "vs. prior period" },
  { key: "transactions", label: "Transactions", value: txnTotal, unit: "number", delta: 4.1, target: round(txnTotal * 1.08), spark: spark(txnTotal / 16, txnTotal / 30), hint: "tickets closed" },
  { key: "avg_basket", label: "Avg Basket", value: round(netSalesTotal / txnTotal, 2), unit: "currency", delta: 3.7, target: round((netSalesTotal / txnTotal) * 1.04, 2), spark: spark(120, 9), hint: "value per ticket" },
  { key: "gross_margin", label: "Gross Margin", value: 54.6, unit: "percent", delta: 1.2, target: 56, spark: spark(54, 1.4), hint: "blended product margin" },
  { key: "conversion", label: "Conversion", value: 27.3, unit: "percent", delta: 2.0, target: 30, spark: spark(26, 1.2), hint: "traffic → buyers" },
  { key: "units_txn", label: "Units / Transaction", value: 2.34, unit: "decimal", delta: 0.9, target: 2.5, spark: spark(2.3, 0.12), hint: "attach & cross-sell" },
  { key: "sales_sqft", label: "Sales / sq-ft", value: round(netSalesTotal / sqftTotal, 2), unit: "currency", delta: 5.5, target: 95, spark: spark(78, 5), hint: "space productivity" },
  { key: "shrinkage", label: "Shrinkage", value: 1.18, unit: "percent", delta: -0.3, target: 1.0, spark: spark(1.2, 0.08, 16, false), hint: "lower is better", invert: true },
];

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const salesTrend: ApertureData["salesTrend"] = Array.from({ length: 30 }, (_, i) => {
  const dow = i % 7;
  const weekendLift = dow === 5 || dow === 6 ? 1.34 : dow === 0 ? 1.1 : 1;
  const base = (netSalesTotal / 22) * weekendLift;
  const day = i + 1;
  return {
    day: `D${day}`,
    label: `Day ${day} · ${DOW[(i + 4) % 7]}`,
    netSales: round(base * rand(0.86, 1.14)),
    target: round((netSalesTotal / 22) * 1.02),
    transactions: randInt(820, 1480),
    lastYear: round(base * rand(0.74, 0.98)),
  };
});

const categoryMix: ApertureData["categoryMix"] = [
  { name: "Apparel", value: 38 },
  { name: "Footwear", value: 21 },
  { name: "Home & Living", value: 16 },
  { name: "Accessories", value: 13 },
  { name: "Beauty", value: 8 },
  { name: "Gifting", value: 4 },
].map((c) => ({ ...c, revenue: round(netSalesTotal * (c.value / 100)) }));

const hourlySales: ApertureData["hourlySales"] = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 9;
  const peak = hour >= 12 && hour <= 18 ? 1.5 : hour >= 19 ? 1.15 : 0.8;
  return {
    hour: `${((hour + 11) % 12) + 1}${hour < 12 ? "a" : "p"}`,
    sales: round((netSalesTotal / 26) * peak * rand(0.8, 1.2)),
    traffic: randInt(60, 240),
  };
});

const paymentMix: ApertureData["paymentMix"] = [
  { name: "Credit Card", value: 46 },
  { name: "Debit", value: 24 },
  { name: "Mobile Wallet", value: 18 },
  { name: "Gift / Store Credit", value: 7 },
  { name: "Cash", value: 5 },
];

const SKU_NAMES: [string, string][] = [
  ["Atlas Wool Overcoat", "Apparel"],
  ["Cirrus Performance Sneaker", "Footwear"],
  ["Linen Sateen Duvet Set", "Home & Living"],
  ["Meridian Leather Tote", "Accessories"],
  ["Halo Cashmere Scarf", "Accessories"],
  ["Drift Lounge Chair", "Home & Living"],
  ["Ember Silk Blouse", "Apparel"],
  ["Trailhead Hiking Boot", "Footwear"],
];
const topSkus: ApertureData["topSkus"] = SKU_NAMES.map(([name, cat], i) => {
  const units = randInt(120, 640) - i * 18;
  const price = round(rand(48, 320), 2);
  return {
    sku: `SKU-${4100 + i}`,
    name,
    category: cat,
    units,
    revenue: round(units * price),
    margin: round(rand(42, 64), 1),
    trend: round(rand(-6, 22), 1),
  };
});

const PRODUCT_DEFS: [string, string, string, number][] = [
  ["Atlas Wool Overcoat", "Apparel", "Atlas", 420],
  ["Ember Silk Blouse", "Apparel", "Ember", 168],
  ["Meridian Tailored Blazer", "Apparel", "Meridian", 295],
  ["Cove Linen Shirt", "Apparel", "Cove", 94],
  ["Vale Merino Sweater", "Apparel", "Vale", 138],
  ["Drift Chino Trouser", "Apparel", "Drift", 110],
  ["Cirrus Performance Sneaker", "Footwear", "Cirrus", 145],
  ["Trailhead Hiking Boot", "Footwear", "Trailhead", 210],
  ["Marlow Leather Loafer", "Footwear", "Marlow", 185],
  ["Aero Running Shoe", "Footwear", "Aero", 132],
  ["Cobble Chelsea Boot", "Footwear", "Cobble", 198],
  ["Linen Sateen Duvet Set", "Home & Living", "Loom", 240],
  ["Drift Lounge Chair", "Home & Living", "Drift", 680],
  ["Hearth Ceramic Vase", "Home & Living", "Hearth", 58],
  ["Loom Throw Blanket", "Home & Living", "Loom", 96],
  ["Glow Table Lamp", "Home & Living", "Glow", 124],
  ["Meridian Leather Tote", "Accessories", "Meridian", 320],
  ["Halo Cashmere Scarf", "Accessories", "Halo", 88],
  ["Atlas Leather Belt", "Accessories", "Atlas", 72],
  ["Cove Sunglasses", "Accessories", "Cove", 145],
  ["Nimbus Wool Beanie", "Accessories", "Nimbus", 38],
  ["Bloom Hydrating Serum", "Beauty", "Bloom", 64],
  ["Lumen Day Cream", "Beauty", "Lumen", 52],
  ["Ember Scented Candle Set", "Gifting", "Ember", 46],
];

const products: ApertureData["products"] = PRODUCT_DEFS.map(([name, category, brand, price], i) => {
  const cost = round(price * rand(0.38, 0.58), 2);
  const margin = round(((price - cost) / price) * 100, 1);
  const stockRaw = randInt(0, 240);
  const stock = i === 6 ? 0 : i === 2 || i === 17 ? randInt(6, 22) : Math.max(stockRaw, 30);
  const unitsSold = randInt(40, 680) - i * 6;
  const status = (stock === 0 ? "out-of-stock" : stock < 25 ? "low-stock" : "active") as ApertureData["products"][number]["status"];
  return {
    sku: `SKU-${4100 + i}`,
    name,
    category,
    brand,
    price,
    cost,
    margin,
    stock,
    unitsSold,
    revenue: round(unitsSold * price),
    status,
  };
});

const regionPerf: ApertureData["regionPerf"] = Object.values(
  stores.reduce<Record<string, ApertureData["regionPerf"][number]>>((acc, s) => {
    acc[s.region] = acc[s.region] || { region: s.region, netSales: 0, transactions: 0, stores: 0 };
    acc[s.region].netSales += s.netSales;
    acc[s.region].transactions += s.transactions;
    acc[s.region].stores += 1;
    return acc;
  }, {})
).map((r) => ({ ...r, netSales: round(r.netSales) }));

const liveFeed: ApertureData["liveFeed"] = [
  { id: 1, store: "Flagship · Madison Ave", type: "sale", text: "Ticket #88421 closed — $642.00 · 4 units", ago: "12s" },
  { id: 2, store: "Buckhead Galleria", type: "alert", text: "Register R-07 offline — lane reassigned", ago: "1m" },
  { id: 3, store: "Pearl District", type: "sale", text: "Ticket #51190 closed — $318.50 · 2 units", ago: "2m" },
  { id: 4, store: "South Congress", type: "warn", text: "Low stock: Atlas Wool Overcoat (M) — 3 left", ago: "4m" },
  { id: 5, store: "Lincoln Park", type: "sale", text: "Loyalty redemption — $40 reward applied", ago: "6m" },
  { id: 6, store: "Bellevue Square", type: "sale", text: "Ticket #77002 closed — $1,204.00 · 7 units", ago: "7m" },
];

export const seedData: ApertureData = {
  meta: {
    company: "Northwind Retail Group",
    product: "Aperture Commerce Cloud",
    period: "Today · Jun 27, 2026",
    generatedAt: "2026-06-27T17:00:00Z",
    storesOnline: stores.filter((s) => s.status !== "offline-lane").length,
    storesTotal: stores.length,
  },
  stores,
  kpis,
  salesTrend,
  categoryMix,
  hourlySales,
  paymentMix,
  topSkus,
  products,
  regionPerf,
  liveFeed,
};

export default seedData;
