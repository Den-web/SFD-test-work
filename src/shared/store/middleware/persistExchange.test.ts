import { configureStore, Middleware } from "@reduxjs/toolkit";
import exchangeReducer, {
  setBaseCurrency,
  addTargetCurrency,
  hydrate,
} from "@/shared/store/slices/exchangeSlice";
import { persistExchangeMiddleware } from "./persistExchange";

function createTestStore(extraMiddleware?: Middleware) {
  return configureStore({
    reducer: { exchange: exchangeReducer },
    middleware: (getDefault) =>
      getDefault({ serializableCheck: false }).concat(
        persistExchangeMiddleware,
        ...(extraMiddleware ? [extraMiddleware] : []),
      ),
  });
}

describe("persistExchangeMiddleware", () => {
  const originalLocalStorage: Storage | undefined =
    typeof global !== "undefined"
      ? (global as unknown as { localStorage?: Storage }).localStorage
      : undefined;

  beforeEach(() => {
    // Mock localStorage (simple in-memory store)
    const store: Record<string, string> = {};
    const mocked: Storage = {
      getItem: (k: string) => (k in store ? store[k] : null),
      setItem: (k: string, v: string) => {
        store[k] = String(v);
      },
      removeItem: (k: string) => {
        delete store[k];
      },
      clear: () => Object.keys(store).forEach((k) => delete store[k]),
      key: (i: number) => Object.keys(store)[i] ?? null,
      get length() {
        return Object.keys(store).length;
      },
    } as unknown as Storage; // satisfy readonly props on Storage in jsdom types
    // assign to both global and window since middleware uses window.localStorage
    Object.defineProperty(global, "localStorage", {
      value: mocked,
      configurable: true,
    });
    Object.defineProperty(window, "localStorage", {
      value: mocked,
      configurable: true,
    });
  });

  afterEach(() => {
    if (originalLocalStorage) {
      Object.defineProperty(global, "localStorage", {
        value: originalLocalStorage,
        configurable: true,
      });
      Object.defineProperty(window, "localStorage", {
        value: originalLocalStorage,
        configurable: true,
      });
    } else {
      // cleanup if none existed
      delete (global as unknown as Record<string, unknown>).localStorage;
      delete (window as unknown as Record<string, unknown>).localStorage;
    }
    jest.restoreAllMocks();
  });

  it("persists on exchange actions", () => {
    const store = createTestStore();
    store.dispatch(setBaseCurrency("usd"));
    store.dispatch(addTargetCurrency("pln"));
    const raw = window.localStorage.getItem("exchange_prefs_v1");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(String(raw));
    expect(parsed.baseCurrency).toBe("usd");
    expect(parsed.targetCurrencies).toEqual(expect.arrayContaining(["pln"]));
  });

  it("does not persist on hydrate action to avoid loops", () => {
    const store = createTestStore();
    window.localStorage.clear();
    store.dispatch(hydrate({ baseCurrency: "usd" }));
    // should not have saved anything on hydrate
    expect(window.localStorage.length).toBe(0);
  });
});
