import { useMemo, useState } from "react";
import type { ApertureData, Product } from "../data/types";
import { fmtUsd, fmtNum, compactUsd } from "../lib/format";

const CAT_COLORS: Record<string, string> = {
  Apparel: "#5b8def",
  Footwear: "#34d8c0",
  "Home & Living": "#9b7bf0",
  Accessories: "#f5b14c",
  Beauty: "#f1657e",
  Gifting: "#7aa6ff",
};

const STATUS_LABEL: Record<Product["status"], string> = {
  active: "Active",
  "low-stock": "Low stock",
  "out-of-stock": "Out of stock",
};
const STATUS_CLASS: Record<Product["status"], string> = {
  active: "healthy",
  "low-stock": "attention",
  "out-of-stock": "offline-lane",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Products({ data }: { data: ApertureData }) {
  const products = data.products ?? [];
  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [cat, setCat] = useState("All");

  const rows = cat === "All" ? products : products.filter((p) => p.category === cat);

  const catalogValue = products.reduce((a, p) => a + p.price * p.stock, 0);
  const unitsSold = products.reduce((a, p) => a + p.unitsSold, 0);
  const active = products.filter((p) => p.status === "active").length;
  const low = products.filter((p) => p.status === "low-stock").length;
  const out = products.filter((p) => p.status === "out-of-stock").length;

  const summary = [
    { label: "Total SKUs", value: fmtNum(products.length) },
    { label: "Active", value: fmtNum(active) },
    { label: "Low / Out of Stock", value: `${low} / ${out}` },
    { label: "On-hand Value", value: compactUsd(catalogValue) },
    { label: "Units Sold", value: fmtNum(unitsSold) },
  ];

  return (
    <div className="content">
      {/* Summary strip */}
      <div className="kpi-hero" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
        {summary.map((s) => (
          <div className="cell" key={s.label}>
            <div className="lbl">{s.label}</div>
            <div className="v">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="sec-head">
        <h2>Product Catalog</h2>
        <span className="muted">
          {rows.length} of {products.length} products
        </span>
        <div className="spacer" />
        <div className="seg">
          {categories.map((c) => (
            <button key={c} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="card">
        <div className="prod-row head">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Margin</span>
          <span>On hand</span>
          <span>Units sold</span>
          <span>Status</span>
        </div>
        {rows.map((p) => (
          <div className="prod-row" key={p.sku}>
            <div className="store-name">
              <span
                className="sq"
                style={{
                  background: `${CAT_COLORS[p.category]}1f`,
                  borderColor: `${CAT_COLORS[p.category]}3a`,
                  color: CAT_COLORS[p.category],
                }}
              >
                {initials(p.name)}
              </span>
              <span>
                <b>{p.name}</b>
                <small>
                  {p.brand} · {p.sku}
                </small>
              </span>
            </div>
            <span>
              <span className="tag" style={{ borderColor: `${CAT_COLORS[p.category]}55` }}>
                {p.category}
              </span>
            </span>
            <span className="num">{fmtUsd(p.price)}</span>
            <span className="num">{p.margin.toFixed(1)}%</span>
            <span className="num">{fmtNum(p.stock)}</span>
            <span className="num">{fmtNum(p.unitsSold)}</span>
            <span>
              <span className={"status " + STATUS_CLASS[p.status]}>
                <span className="d" />
                {STATUS_LABEL[p.status]}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
