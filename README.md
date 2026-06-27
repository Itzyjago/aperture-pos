# Aperture POS · Commerce Cloud

**The enterprise point-of-sale & retail-operations platform for multi-store chains — live KPIs, multi-store analytics, and sales intelligence in one command center.**

![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Node-5b8def)
![status](https://img.shields.io/badge/build-passing-34d8c0)
![version](https://img.shields.io/badge/version-v1.0-informational)
![license](https://img.shields.io/badge/license-Commercial-blue)

## What it is

Aperture Commerce Cloud is a multi-tenant SaaS platform that gives retail
operators a single live picture across every store, register, and SKU. It
unifies point-of-sale transactions, inventory, and customer loyalty, then
surfaces the metrics that move the business — net sales, basket value, margin,
conversion, and shrinkage — alongside the analytics to act on them.

This repository contains the **operations console**: a React command center
backed by a Node/Express API.

## Highlight surfaces

- **Command Center** — top-line KPIs, a 30-day net-sales trend vs. target and
  last year, a live activity stream, sales-by-region, and a ranked store
  leaderboard.
- **KPIs** — eight tracked metrics (Net Sales, Transactions, Avg Basket, Gross
  Margin, Conversion, Units/Transaction, Sales/sq-ft, Shrinkage) each with
  trend, sparkline, and target attainment.
- **Analytics** — sales & traffic by hour, category mix, store leaderboard,
  payment/tender mix, and top SKUs by units, revenue, and margin.
- **Products** — the full product catalog: 24 SKUs with brand, pricing, margin,
  on-hand stock, units sold, and stock status, filterable by category.

## Tech

| Layer    | Stack                                             |
| -------- | ------------------------------------------------- |
| Frontend | React 18 + TypeScript + Vite, Recharts            |
| Backend  | Node + Express (seeded retail data API)           |
| Styling  | Hand-built design system (premium dark theme)     |

The frontend prefers the live API and falls back to a bundled deterministic
snapshot, so the console always renders.

## Run it

```bash
npm install
npm run dev      # starts the Express API (:5181) and Vite (:5180) together
```

Then open <http://localhost:5180>.

| Script            | Does                                  |
| ----------------- | ------------------------------------- |
| `npm run dev`     | API + web, concurrently               |
| `npm run dev:api` | Express API only (`:5181`)            |
| `npm run dev:web` | Vite dev server only (`:5180`)        |
| `npm run build`   | Production web build                  |
| `npm run start`   | Express API (serves seeded data)      |

## API

| Endpoint         | Returns                                            |
| ---------------- | -------------------------------------------------- |
| `/api/overview`  | KPIs, stores, sales trend, live feed, regions      |
| `/api/kpis`      | KPI cards + store detail                           |
| `/api/analytics` | category mix, hourly, payment mix, top SKUs        |
| `/api/products`  | full product catalog                               |
| `/api/stores`    | store fleet                                        |

## Note

Demo data models a fictional chain, **Northwind Retail Group**. All figures are
generated from a fixed seed and are illustrative.

---

© 2026 Aperture Commerce Cloud. Commercial.
