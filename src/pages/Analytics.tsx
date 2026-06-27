import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { ApertureData } from "../data/types";
import { compactUsd, fmtUsd, fmtNum, signed } from "../lib/format";

const CAT_COLORS = ["#5b8def", "#34d8c0", "#9b7bf0", "#f5b14c", "#7aa6ff", "#f1657e"];
const PAY_COLORS = ["#5b8def", "#34d8c0", "#9b7bf0", "#f5b14c", "#647793"];

export function Analytics({ data }: { data: ApertureData }) {
  const stores = [...data.stores].sort((a, b) => b.netSales - a.netSales);

  return (
    <div className="content">
      <div className="sec-head">
        <h2>Retail Analytics</h2>
        <span className="muted">sales intelligence across stores, categories &amp; channels</span>
      </div>

      {/* Row 1 — hourly + category mix */}
      <div className="grid an-grid">
        <div className="card">
          <div className="card-head">
            <h3>Sales &amp; Traffic by Hour</h3>
            <span className="muted">store hours 9a–9p</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <ComposedChart data={data.hourlySales} margin={{ top: 12, right: 14, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="gHour" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b8def" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5b8def" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#18223a" vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis yAxisId="l" tickLine={false} axisLine={false} width={46} tickFormatter={(v) => compactUsd(v)} />
                <YAxis yAxisId="r" orientation="right" tickLine={false} axisLine={false} width={36} />
                <Tooltip
                  formatter={(v: number, n) => (n === "sales" ? [fmtUsd(v), "Sales"] : [fmtNum(v), "Traffic"])}
                  cursor={{ fill: "rgba(91,141,239,0.06)" }}
                />
                <Bar yAxisId="l" dataKey="sales" fill="url(#gHour)" radius={[5, 5, 0, 0]} barSize={20} />
                <Line yAxisId="r" type="monotone" dataKey="traffic" stroke="#34d8c0" strokeWidth={2.2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            <span className="it"><span className="sw" style={{ background: "#5b8def" }} /> Sales</span>
            <span className="it"><span className="sw" style={{ background: "#34d8c0" }} /> Foot traffic</span>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Category Mix</h3>
            <span className="muted">share of revenue</span>
          </div>
          <div style={{ padding: "6px 14px 10px", position: "relative" }}>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={data.categoryMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={58}
                  outerRadius={86}
                  paddingAngle={2}
                  stroke="none"
                >
                  {data.categoryMix.map((_, i) => (
                    <Cell key={i} fill={CAT_COLORS[i % CAT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number, n) => [`${v}%`, n as string]} />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-60%)",
                textAlign: "center",
                pointerEvents: "none",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 750 }}>{compactUsd(data.categoryMix.reduce((a, c) => a + (c.revenue ?? 0), 0))}</div>
              <div style={{ fontSize: 10.5, color: "var(--txt-3)" }}>total revenue</div>
            </div>
          </div>
          <div className="legend">
            {data.categoryMix.map((c, i) => (
              <span className="it" key={c.name}>
                <span className="sw" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }} /> {c.name} · {c.value}%
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2 — store leaderboard bars + payment mix */}
      <div className="grid an-grid">
        <div className="card">
          <div className="card-head">
            <h3>Store Leaderboard</h3>
            <span className="muted">net sales by location</span>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={262}>
              <BarChart data={stores} layout="vertical" margin={{ top: 6, right: 20, left: 8, bottom: 0 }}>
                <CartesianGrid stroke="#18223a" horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => compactUsd(v)} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={132} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [fmtUsd(v), "Net Sales"]} cursor={{ fill: "rgba(91,141,239,0.06)" }} />
                <Bar dataKey="netSales" radius={[0, 6, 6, 0]} barSize={18}>
                  {stores.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#34d8c0" : "#5b8def"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Payment Mix</h3>
            <span className="muted">tender type</span>
          </div>
          <div style={{ padding: "10px 18px 18px", display: "flex", flexDirection: "column", gap: 13 }}>
            {data.paymentMix.map((p, i) => (
              <div key={p.name}>
                <div style={{ display: "flex", fontSize: 12.5, marginBottom: 5 }}>
                  <span style={{ color: "var(--txt-2)" }}>{p.name}</span>
                  <span className="num" style={{ marginLeft: "auto" }}>{p.value}%</span>
                </div>
                <div className="minibar">
                  <span style={{ width: `${p.value}%`, background: PAY_COLORS[i % PAY_COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top SKUs */}
      <div className="card">
        <div className="card-head">
          <h3>Top SKUs</h3>
          <span className="muted">best sellers · units, revenue &amp; margin</span>
        </div>
        <div className="sku-row head">
          <span>Product</span>
          <span>Units</span>
          <span>Revenue</span>
          <span>Margin</span>
          <span>Trend</span>
        </div>
        {data.topSkus.map((s) => (
          <div className="sku-row" key={s.sku}>
            <div>
              <b style={{ fontWeight: 600 }}>{s.name}</b>
              <div style={{ marginTop: 3, display: "flex", gap: 8, alignItems: "center" }}>
                <span className="tag">{s.category}</span>
                <small style={{ color: "var(--txt-3)" }}>{s.sku}</small>
              </div>
            </div>
            <span className="num">{fmtNum(s.units)}</span>
            <span className="num">{fmtUsd(s.revenue)}</span>
            <span className="num">{s.margin.toFixed(1)}%</span>
            <span className={"delta " + (s.trend >= 0 ? "up" : "down")} style={{ justifySelf: "start" }}>
              {signed(s.trend)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
