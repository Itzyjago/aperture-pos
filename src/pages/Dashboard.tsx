import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { ApertureData } from "../data/types";
import { KpiCard } from "../components/KpiCard";
import { KPI_META, fallbackMeta } from "../lib/kpiMeta";
import { compactUsd, fmtUsd, fmtNum, signed } from "../lib/format";

const REGION_COLORS = ["#5b8def", "#34d8c0", "#9b7bf0", "#f5b14c"];

export function Dashboard({ data }: { data: ApertureData }) {
  const topKpis = data.kpis.slice(0, 4);
  const leaderboard = [...data.stores].sort((a, b) => b.netSales - a.netSales);
  const maxSales = Math.max(...leaderboard.map((s) => s.netSales));

  return (
    <div className="content">
      {/* KPI row */}
      <div className="grid kpi-grid">
        {topKpis.map((k) => {
          const m = KPI_META[k.key] ?? fallbackMeta;
          return <KpiCard key={k.key} kpi={k} icon={m.icon} accent={m.accent} />;
        })}
      </div>

      <div className="grid dash-grid">
        {/* Sales trend */}
        <div className="card">
          <div className="card-head">
            <h3>Net Sales · last 30 days</h3>
            <span className="muted">vs target &amp; last year</span>
            <div className="spacer" />
            <div className="seg">
              <button className="on">30D</button>
              <button>QTD</button>
              <button>YTD</button>
            </div>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={264}>
              <AreaChart data={data.salesTrend} margin={{ top: 10, right: 12, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5b8def" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#18223a" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} interval={3} />
                <YAxis tickLine={false} axisLine={false} width={48} tickFormatter={(v) => compactUsd(v)} />
                <Tooltip
                  formatter={(v: number, n: any) => {
                    const m: Record<string, string> = { netSales: "Net Sales", target: "Target", lastYear: "Last Year" };
                    return [fmtUsd(v), m[n] ?? n];
                  }}
                  labelFormatter={(_l: any, p: any) => p?.[0]?.payload?.label ?? ""}
                />
                <Area type="monotone" dataKey="netSales" stroke="#5b8def" strokeWidth={2.4} fill="url(#gSales)" />
                <Line type="monotone" dataKey="target" stroke="#34d8c0" strokeWidth={1.6} strokeDasharray="5 4" dot={false} />
                <Line type="monotone" dataKey="lastYear" stroke="#647793" strokeWidth={1.4} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="legend">
            <span className="it"><span className="sw" style={{ background: "#5b8def" }} /> Net Sales</span>
            <span className="it"><span className="sw" style={{ background: "#34d8c0" }} /> Target</span>
            <span className="it"><span className="sw" style={{ background: "#647793" }} /> Last Year</span>
          </div>
        </div>

        {/* Live feed + region mix */}
        <div className="grid" style={{ gap: 16 }}>
          <div className="card">
            <div className="card-head">
              <h3>Live Activity</h3>
              <div className="spacer" />
              <span className="pill live" style={{ padding: "4px 10px" }}>
                <span className="dot" /> streaming
              </span>
            </div>
            <div className="feed">
              {data.liveFeed.map((f) => (
                <div className="it" key={f.id}>
                  <span className={"dot " + f.type} />
                  <div>
                    <div className="tx">{f.text}</div>
                    <div className="meta">{f.store}</div>
                  </div>
                  <span className="ago">{f.ago}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <h3>Sales by Region</h3>
            </div>
            <div style={{ display: "flex", alignItems: "center", padding: "4px 14px 16px" }}>
              <ResponsiveContainer width="50%" height={150}>
                <PieChart>
                  <Pie
                    data={data.regionPerf}
                    dataKey="netSales"
                    nameKey="region"
                    innerRadius={42}
                    outerRadius={64}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {data.regionPerf.map((_, i) => (
                      <Cell key={i} fill={REGION_COLORS[i % REGION_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => fmtUsd(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9 }}>
                {data.regionPerf.map((r, i) => (
                  <div key={r.region} className="it" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                    <span className="sw" style={{ width: 10, height: 10, borderRadius: 3, background: REGION_COLORS[i % REGION_COLORS.length] }} />
                    <span style={{ color: "var(--txt-2)" }}>{r.region}</span>
                    <span className="num" style={{ marginLeft: "auto" }}>{compactUsd(r.netSales)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store leaderboard */}
      <div className="card">
        <div className="card-head">
          <h3>Store Performance</h3>
          <span className="muted">today · ranked by net sales</span>
        </div>
        <div className="store-row head">
          <span>Store</span>
          <span>Net Sales</span>
          <span>Transactions</span>
          <span>Avg Basket</span>
          <span>Status</span>
        </div>
        {leaderboard.map((s) => (
          <div className="store-row" key={s.id}>
            <div className="store-name">
              <span className="sq">{s.id.replace("ST-", "")}</span>
              <span>
                <b>{s.name}</b>
                <small>{s.region} · {s.manager} · {s.registersOnline}/{s.registersTotal} registers</small>
              </span>
            </div>
            <div>
              <div className="num">{fmtUsd(s.netSales)}</div>
              <div className="minibar" style={{ marginTop: 5 }}>
                <span style={{ width: `${(s.netSales / maxSales) * 100}%` }} />
              </div>
            </div>
            <span className="num">{fmtNum(s.transactions)}</span>
            <span className="num">{fmtUsd(s.avgBasket)}</span>
            <span>
              <span className={"status " + s.status}>
                <span className="d" />
                {s.status === "healthy" ? "Healthy" : s.status === "attention" ? "Attention" : "Lane down"}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
