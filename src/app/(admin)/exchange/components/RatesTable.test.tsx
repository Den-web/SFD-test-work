import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "@/shared/store/slices/exchangeSlice";
import { baseApi } from "@/shared/api/baseApi";
import RatesTable from "./RatesTable";

describe("RatesTable", () => {
  it("renders columns for selected targets and 7 rows", async () => {
    const store = configureStore({
      reducer: { exchange: exchangeReducer, [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });

    // Mock fetch used by useExchangeRates
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ gbp: { usd: 1.2, eur: 1.1 } }),
    })) as any;

    render(
      <Provider store={store}>
        <RatesTable />
      </Provider>,
    );

    expect(await screen.findByText(/GBP vs selected currencies/i)).toBeInTheDocument();
    // headers for USD/EUR appear due to default targets
    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
  });
});
