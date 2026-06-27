import { IcSearch, IcBell } from "./Icons";

type Props = { title: string; sub: string; live: boolean; period: string };

export function Topbar({ title, sub, live, period }: Props) {
  return (
    <header className="topbar">
      <div>
        <h1>{title}</h1>
        <div className="sub">{sub}</div>
      </div>
      <div className="spacer" />
      <div className="search">
        <IcSearch />
        Search stores, SKUs, tickets…
      </div>
      <span className={"pill" + (live ? " live" : "")}>
        <span className="dot" />
        {live ? "Live · API connected" : "Live · snapshot"}
      </span>
      <span className="pill">{period}</span>
      <button className="icon-btn" aria-label="Notifications">
        <IcBell />
        <span className="nb">3</span>
      </button>
    </header>
  );
}
