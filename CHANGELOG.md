## 0.1.0 (2025-10-19)

### Features

- feat(persist): save exchange prefs to localStorage and hydrate on load
- feat(ui): add fullscreen preloader for initial currency load and route loading state
- feat(exchange): add useExchangeRates hook and refactor RatesTable
- feat(exchange): currency rates for last 7 days with base/date/currencies controls
- feat(dashboard): implement admin dashboard with RTK Query example
- feat(store): add Redux Toolkit store and RTK Query base setup
- feat(core): setup project structure with Atomic Design and utils

### Fixes

- fix(exchange): prevent rc-virtual-list scrollTo warning and guard values
- fix(types): replace Menu href with Next Link in Sidebar

### Tests

- test: setup Jest + RTL and add unit tests for slice and utils
- test(flow): add integration test for base change and target updates
- test: rewrite persist tests with in-memory localStorage
- test: stabilize date clamp test
- test: remove ts-expect-error; all tests green

### Chore/CI

- chore(ci): add CI, commitlint hooks, editor config, stricter linting
- chore(ts): exclude .next from typecheck
- chore(init): initialize Next.js TypeScript project
