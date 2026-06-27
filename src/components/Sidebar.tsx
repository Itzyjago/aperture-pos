import { NavLink } from "react-router-dom";
import {
  IcGrid,
  IcPulse,
  IcChart,
  IcStore,
  IcCart,
  IcBox,
  IcTag,
  IcUsers,
  IcGear,
} from "./Icons";

const item = ({ isActive }: { isActive: boolean }) => "nav-item" + (isActive ? " active" : "");

export function Sidebar() {
  return (
    <aside className="side">
      <div className="brand">
        <span className="mark">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="7" stroke="#7aa6ff" strokeWidth="1.6" />
            <path d="M12 5.4 13.4 12 12 18.6 10.6 12Z" fill="#7aa6ff" />
            <circle cx="12" cy="12" r="1.5" fill="#0b1020" stroke="#7aa6ff" strokeWidth="1.1" />
          </svg>
        </span>
        <span>
          <b>Aperture</b>
          <small>Commerce Cloud</small>
        </span>
      </div>

      <div className="org">
        <span className="av">NW</span>
        <span className="info">
          <b>Northwind Retail Group</b>
          <small>Enterprise · 6 stores</small>
        </span>
      </div>

      <nav className="nav-group">
        <div className="lbl">Overview</div>
        <NavLink to="/" end className={item}>
          <IcGrid /> Command Center
        </NavLink>
        <NavLink to="/kpis" className={item}>
          <IcPulse /> KPIs
        </NavLink>
        <NavLink to="/analytics" className={item}>
          <IcChart /> Analytics
        </NavLink>
      </nav>

      <nav className="nav-group">
        <div className="lbl">Retail Ops</div>
        <NavLink to="/stores" className={item}>
          <IcStore /> Stores &amp; Registers
        </NavLink>
        <NavLink to="/transactions" className={item}>
          <IcCart /> Transactions
        </NavLink>
        <NavLink to="/inventory" className={item}>
          <IcBox /> Inventory
          <span className="badge">7</span>
        </NavLink>
        <NavLink to="/promotions" className={item}>
          <IcTag /> Promotions
        </NavLink>
        <NavLink to="/customers" className={item}>
          <IcUsers /> Customers
        </NavLink>
      </nav>

      <nav className="nav-group">
        <div className="lbl">System</div>
        <NavLink to="/settings" className={item}>
          <IcGear /> Settings
        </NavLink>
      </nav>

      <div className="side-foot">
        <span className="av">CA</span>
        <span>
          <b style={{ fontSize: 12.5 }}>Casey Arroyo</b>
          <small>VP, Retail Operations</small>
        </span>
      </div>
    </aside>
  );
}
