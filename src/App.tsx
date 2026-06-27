import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Dashboard } from "./pages/Dashboard";
import { Kpis } from "./pages/Kpis";
import { Analytics } from "./pages/Analytics";
import { Stub } from "./pages/Stub";
import { useData } from "./lib/useData";

const TITLES: Record<string, { title: string; sub: string }> = {
  "/": { title: "Command Center", sub: "Real-time retail operations across all stores" },
  "/kpis": { title: "Performance KPIs", sub: "Tracked metrics vs. target and prior period" },
  "/analytics": { title: "Retail Analytics", sub: "Sales intelligence across stores, categories & channels" },
  "/stores": { title: "Stores & Registers", sub: "Fleet status, lanes and staffing" },
  "/transactions": { title: "Transactions", sub: "Ticket-level sales journal" },
  "/inventory": { title: "Inventory", sub: "Stock positions and replenishment" },
  "/promotions": { title: "Promotions", sub: "Campaigns and price events" },
  "/customers": { title: "Customers", sub: "Loyalty and CRM" },
  "/settings": { title: "Settings", sub: "Workspace configuration" },
};

export default function App() {
  const { data, live } = useData();
  const { pathname } = useLocation();
  const head = TITLES[pathname] ?? { title: "Aperture", sub: "" };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar title={head.title} sub={head.sub} live={live} period={data.meta.period} />
        <Routes>
          <Route path="/" element={<Dashboard data={data} />} />
          <Route path="/kpis" element={<Kpis data={data} />} />
          <Route path="/analytics" element={<Analytics data={data} />} />
          <Route path="/stores" element={<Stub title="Stores & Registers" blurb="Fleet view of every store, lane and register — online status, staffing and throughput. Wired to the same live operations feed powering the Command Center." />} />
          <Route path="/transactions" element={<Stub title="Transactions" blurb="Searchable ticket-level sales journal with line items, tenders, refunds and associate attribution." />} />
          <Route path="/inventory" element={<Stub title="Inventory" blurb="Real-time stock positions, low-stock alerts and automated replenishment across the chain." />} />
          <Route path="/promotions" element={<Stub title="Promotions" blurb="Plan and schedule price events, bundles and loyalty offers with margin guardrails." />} />
          <Route path="/customers" element={<Stub title="Customers" blurb="Unified loyalty profiles, lifetime value and segment-level performance." />} />
          <Route path="/settings" element={<Stub title="Settings" blurb="Workspace, roles and integration configuration." />} />
        </Routes>
      </div>
    </div>
  );
}
