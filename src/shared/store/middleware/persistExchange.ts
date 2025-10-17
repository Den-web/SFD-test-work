import type { Middleware } from "@reduxjs/toolkit";

const STORAGE_KEY = "exchange_prefs_v1";

export const persistExchangeMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  try {
    if (typeof window === "undefined") return result;
    // persist on any exchange action except hydration to avoid loops
    if (
      typeof action.type === "string" &&
      action.type.startsWith("exchange/") &&
      action.type !== "exchange/hydrate"
    ) {
      const state = storeApi.getState() as any;
      const { baseCurrency, selectedDate, targetCurrencies } = state.exchange || {};
      const payload = { baseCurrency, selectedDate, targetCurrencies };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
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
