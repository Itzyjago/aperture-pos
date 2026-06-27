import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { ApertureData } from "../data/types";
import { KpiCard } from "../components/KpiCard";
import { KPI_META, fallbackMeta } from "../lib/kpiMeta";
import { formatValue, signed, fmtUsd } from "../lib/format";

export function Kpis({ data }: { data: ApertureData }) {
  const hero = data.kpis.filter((k) => ["net_sales", "transactions", "avg_basket", "gross_margin"].includes(k.key));
  const attain = data.kpis.map((k) => ({
    label: k.label,
    pct: Math.round((k.value / k.target) * 100),
  }));

  return (
    <div className="content">
      {/* Hero summary strip */}
      <div className="kpi-hero">
        {hero.map((k) => {
          const good = k.invert ? k.delta <= 0 : k.delta >= 0;
          return (
            <div className="cell" key={k.key}>
              <div className="lbl">{k.label}</div>
              <div className="v">{formatValue(k.value, k.unit)}</div>
              <div className="row">
                <span className={"delta " + (good ? "up" : "down")}>{signed(k.delta)}</span>
                <span style={{ fontSize: 11, color: "var(--txt-3)" }}>{k.hint}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sec-head">
        <h2>Key Performance Indicators</h2>
        <span className="muted">8 tracked metrics · vs. target &amp; prior period</span>
      </div>

      {/* All KPI cards */}
      <div className="grid kpi-grid">
        {data.kpis.map((k) => {
          const m = KPI_META[k.key] ?? fallbackMeta;
          return <KpiCard key={k.key} kpi={k} icon={m.icon} accent={m.accent} />;
        })}
      </div>

      {/* Target attainment */}
      <div className="card">
        <div className="card-head">
          <h3>Target Attainment</h3>
          <span className="muted">% of period target achieved</span>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attain} margin={{ top: 12, right: 16, left: 4, bottom: 0 }} barCategoryGap={22}>
              <CartesianGrid stroke="#18223a" vertical={false} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} interval={0} angle={-12} textAnchor="end" height={50} tick={{ fontSize: 10.5 }} />
              <YAxis tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `${v}%`} domain={[0, 120]} />
              <Tooltip formatter={(v: number) => [`${v}%`, "Attainment"]} cursor={{ fill: "rgba(91,141,239,0.06)" }} />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {attain.map((a, i) => (
                  <Cell key={i} fill={a.pct >= 100 ? "#34d8c0" : a.pct >= 90 ? "#5b8def" : "#f5b14c"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
