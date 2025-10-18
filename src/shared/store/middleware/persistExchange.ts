import type { Middleware } from "@reduxjs/toolkit";

const STORAGE_KEY = "exchange_prefs_v1";

export const persistExchangeMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  try {
    if (typeof window === "undefined") return result;
    // persist on any exchange action except hydration to avoid loops
    const act = action as { type?: unknown };
    if (typeof act.type === "string") {
      const type = act.type;
      if (type.startsWith("exchange/") && type !== "exchange/hydrate") {
        const state = storeApi.getState() as {
          exchange?: { baseCurrency: string; selectedDate: string; targetCurrencies: string[] };
        };
        if (state.exchange) {
          const { baseCurrency, selectedDate, targetCurrencies } = state.exchange;
          const payload = { baseCurrency, selectedDate, targetCurrencies };
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        }
      }
    }
  } catch {}
  return result;
};

export function readPersistedExchange(): Partial<{
  baseCurrency: string;
  selectedDate: string;
  targetCurrencies: string[];
}> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
