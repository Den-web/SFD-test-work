Production-ready Next.js (App Router) + TypeScript + Ant Design + Redux Toolkit (RTK + RTK Query) app implementing the currency exchange task.

## Requirements implemented

- Default base: GBP; compare vs 7 currencies (USD, EUR, JPY, CHF, CAD, AUD, ZAR)
- Change base currency
- Add/remove target currencies from the list of available currencies (3–7 enforced)
- Pick end date; show last 7 days of rates; clamp selectable dates to 90 days past
- Data via Fawaz Ahmed currency API

## Tech

- Next.js 15+, TypeScript
- Redux Toolkit, RTK Query
- Ant Design 5
- ESLint + Prettier + Husky + lint-staged
- Jest + React Testing Library

## Getting started

1. Install deps:
   ```bash
   npm install
   ```
2. Optionally set API base (unused for CDN rates):
   ```bash
   echo "NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com" > .env.local
   ```
3. Run dev:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` – you will be redirected to `/exchange`.

## Scripts

- `npm run dev` – start dev server
- `npm run build && npm start` – production build and run
- `npm run lint` – ESLint (scoped to `src`)
- `npm test` – unit tests

## Project structure

See `src/` – Atomic Design (`shared/ui/`), `shared/api`, `shared/store`, `app/(admin)/*` with `exchange` page.

## Notes

- Rates API is fetched directly from CDN per spec.
- Basic tests included for slice and date utils; add more as needed.
