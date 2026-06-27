import type { ComponentType } from "react";
import type { Kpi } from "../data/types";
import { formatValue, signed } from "../lib/format";
import { Sparkline } from "./Sparkline";
import { IcUp, IcDown } from "./Icons";

type Props = { kpi: Kpi; icon: ComponentType<{ className?: string }>; accent?: string };

export function KpiCard({ kpi, icon: Icon, accent = "#5b8def" }: Props) {
  // For most KPIs up is good; for inverted ones (shrinkage) down is good.
  const good = kpi.invert ? kpi.delta <= 0 : kpi.delta >= 0;
  const pct = Math.min(100, Math.round((kpi.value / kpi.target) * 100));
  return (
    <div className="card kpi">
      <div className="top">
        <span className="ic" style={{ color: accent, background: `${accent}1f`, borderColor: `${accent}3a` }}>
          <Icon />
        </span>
        {kpi.label}
      </div>
      <div className="val">{formatValue(kpi.value, kpi.unit)}</div>
      <div className="row">
        <span className={"delta " + (good ? "up" : "down")}>
          {kpi.delta >= 0 ? <IcUp /> : <IcDown />}
          {signed(kpi.delta)}
        </span>
        {kpi.hint}
      </div>
      <div className="bar">
        <span style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #34d8c0)` }} />
      </div>
      <div className="tgt">
        {pct}% of target · {formatValue(kpi.target, kpi.unit)}
      </div>
      <div className="spark">
        <Sparkline data={kpi.spark} color={accent} id={kpi.key} />
      </div>
    </div>
  );
}
