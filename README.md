# 🌱 GrowBro — AI-Powered Business Growth Platform

GrowBro helps business owners **identify their business problems** and find **practical,
alternative strategies** to grow. It's a modern SaaS-style React app with a solution dashboard,
interactive growth metrics, and an AI business advisor chatbot.

## ✨ Features

- **Authentication** — Sign in / sign up with a polished, responsive login page and a one-click
  **demo account** (`demo@growbro.io` / `demo1234`).
- **Solution Dashboard** — Enter business info (industry, goals, customers, situation, problems)
  and get:
  - **Problem identification** — auto-detected from your profile.
  - **Strategy recommendations** — personalized, prioritized moves with next steps.
  - **Case studies & growth tricks** — real-world inspiration.
  - **Metrics snapshot** — revenue, customers, conversion, order value + trend chart.
  - **Progress tracker** — milestones to track your growth journey.
- **Growth Metrics** — a full analytics page with interactive Recharts (revenue area, channel
  breakdown pie, orders bar) + health KPIs (NPS, churn).
- **AI Business Advisor** — a modern chat interface. Describe any business problem and get an
  instant solution with strategies and next steps. Conversation history is preserved.
- **Persistent state** — session, profile, milestones, and chat all survive a page reload
  (localStorage).

## 🛠 Tech Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Build      | Vite + TypeScript                                  |
| UI         | React 18, Tailwind CSS, framer-motion, Lucide icons |
| Data viz   | Recharts                                           |
| State      | Zustand (persisted to localStorage)                |
| Routing    | React Router v6                                    |
| AI         | Anthropic API (optional) + built-in fallback engine |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install --include=dev

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. (Optional) connect a real AI
#    Copy .env.example to .env.local and add your key:
#    ANTHROPIC_API_KEY=sk-ant-...
```

Log in with the **demo account** (`demo@growbro.io` / `demo1234`) or click **"Explore the demo
account"** on the login page.

## 📦 Scripts

| Command               | Description                            |
| --------------------- | -------------------------------------- |
| `npm run dev`         | Start the Vite dev server              |
| `npm run build`       | Type-check + production build (to `dist/`) |
| `npm run preview`     | Serve the production build locally     |
| `npm run typecheck`   | Run the TypeScript compiler (no emit)  |

## 🔐 AI Integration

The chatbot uses the **Anthropic Messages API** when an `ANTHROPIC_API_KEY` is set in `.env.local`.
The key is read at runtime via `import.meta.env`.

> ⚠️ **Demo note:** a browser-exposed API key is not truly secret — this is intended for local
> demos. For a production deployment, move AI calls behind a serverless/backend endpoint that
> holds the key.

When **no key** is set (the default), GrowBro uses a **built-in deterministic business engine**
(`src/lib/businessLogic.ts`) that analyzes the profile and returns explainable recommendations —
so the entire app is fully functional offline. The lightblue "Demo engine" badge on the chat page
shows which mode is active.

## 🧪 Tests

A lightweight runtime smoke test exercises the core engine (no browser needed):

```bash
node scripts/smoke-test.mjs
```

## 🗂 Project Structure

```
src/
├── components/
│   ├── chat/      # ChatBubble, ChatInput, AiSolutionView
│   ├── dashboard/ # StatCard, RevenueChart, StrategyCard, CaseStudyCard, ...
│   ├── layout/    # AppLayout, Sidebar, Toast, Logo
│   └── ui/        # Button, Card, Input, Badge, Spinner, EmptyState
├── data/          # demo user, demo business, content library
├── lib/           # ai, businessLogic, format, storage
├── pages/         # Login, Dashboard, Metrics, Chat
├── store/         # auth, business, toast (Zustand)
└── types/         # shared TypeScript types
```

## 📌 Notes / Limitations

- Authentication is **client-side demo only** (seeded accounts stored in localStorage). A real
  backend/OAuth is future work.
- Charts and metrics use **realistic demo data** so the app looks complete without a database.
- The production bundle warns about chunk size (largely Recharts) — fine for a demo; code-splitting
  can be added later.
