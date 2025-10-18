import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer, {
  removeTargetCurrency,
  setBaseCurrency,
} from "@/shared/store/slices/exchangeSlice";
import { baseApi } from "@/shared/api/baseApi";
import RatesTable from "./components/RatesTable";

describe("exchange flow integration", () => {
  beforeEach(() => {
    let calls = 0;
    global.fetch = jest.fn(async (url: string) => {
      calls += 1;
      const base = url.match(/currencies\/(\w+)\.json/)?.[1] ?? "gbp";
      const map = base === "usd" ? { usd: 1, eur: 0.9, zar: 18 } : { usd: 1.2, eur: 1.1, zar: 20 };
      return { ok: true, json: async () => ({ [base]: map }) } as any;
    }) as any;
  });

  it("re-fetches 7 requests on base change and updates columns after target change", async () => {
    const store = configureStore({
      reducer: { exchange: exchangeReducer, [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });

    render(
      <Provider store={store}>
        <RatesTable />
      </Provider>,
    );

    // initial render done
    expect(await screen.findByText(/GBP vs selected currencies/i)).toBeInTheDocument();
    await waitFor(() => {
      expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(7);
    });

    // change base -> should fetch 7 more
    store.dispatch(setBaseCurrency("usd"));
    await waitFor(() => {
      expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(14);
      const lastUrl = (global.fetch as jest.Mock).mock.calls.at(-1)?.[0] as string;
      expect(lastUrl).toContain("/usd.json");
    });

    // remove one target and verify column disappears
    store.dispatch(removeTargetCurrency("zar"));
    await waitFor(() => {
      expect(screen.queryByText("ZAR")).toBeNull();
    });
  });
});
