# Subscriber Retention Intelligence — Web Dashboard

Live interactive companion to the Power BI dashboard for the KKBox churn
retention project. Same design (dark glass theme, KKBox-blue accent, Layout C
structure), built with the project's production stack instead of a preview
HTML file.

## Stack
- React + Vite
- Recharts (bubble + bar charts)
- Framer Motion (slicer pill transition, panel fade on channel change)
- Plain CSS (no Tailwind/component library) matching the locked design tokens

## Data
All figures in `src/data/channelData.js` are sourced from verified Supabase
SQL queries against the real KKBox dataset, cross-checked against the shipped
Power BI dashboard. One figure — the "All Channels" avg risk score per tier —
is a weighted average computed from the 5 per-channel results, flagged in a
comment where it appears, since the original SQL didn't return that figure
unfiltered.

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
```
Outputs to `dist/`.

## Deploy
Not yet deployed — this repo is ready to push to GitHub and deploy via Vercel
whenever you're ready.
