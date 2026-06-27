// Aperture Commerce Cloud — Express API.
// Serves seeded retail data for the React command center. In production this
// layer would front the POS transaction store and the analytics warehouse;
// here it returns the deterministic seed so the demo is self-contained.
import express from "express";
import cors from "cors";
import { seed } from "./data/seed.js";

const app = express();
const PORT = process.env.PORT || 5181;

app.use(cors());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "aperture-commerce-cloud" }));

app.get("/api/overview", (_req, res) =>
  res.json({
    meta: seed.meta,
    kpis: seed.kpis,
    stores: seed.stores,
    salesTrend: seed.salesTrend,
    liveFeed: seed.liveFeed,
    regionPerf: seed.regionPerf,
    products: seed.products,
  })
);

app.get("/api/products", (_req, res) => res.json({ meta: seed.meta, products: seed.products }));

app.get("/api/kpis", (_req, res) => res.json({ meta: seed.meta, kpis: seed.kpis, stores: seed.stores }));

app.get("/api/analytics", (_req, res) =>
  res.json({
    meta: seed.meta,
    salesTrend: seed.salesTrend,
    categoryMix: seed.categoryMix,
    hourlySales: seed.hourlySales,
    paymentMix: seed.paymentMix,
    topSkus: seed.topSkus,
    regionPerf: seed.regionPerf,
    stores: seed.stores,
  })
);

app.get("/api/stores", (_req, res) => res.json({ meta: seed.meta, stores: seed.stores }));

app.listen(PORT, () => {
  console.log(`[aperture] Commerce Cloud API listening on http://localhost:${PORT}`);
});
