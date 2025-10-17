import { renderHook, waitFor } from "@testing-library/react";
import { useExchangeRates } from "./useExchangeRates";

const mockFetch = jest.fn();

describe("useExchangeRates", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as any;
  });

  it("fetches 7 days sequentially and aggregates series", async () => {
    const base = "gbp";
    const compare = ["usd", "eur"];
    const selectedDate = "2024-03-08";

    mockFetch.mockImplementation(async (url: string) => {
      const d = url.match(/@([\d-]+)\//)?.[1];
      const day = Number(d?.slice(-2));
      return {
        ok: true,
        json: async () => ({
          [base]: { usd: 1 + day / 100, eur: 0.8 + day / 100 },
        }),
      } as any;
    });

    const { result } = renderHook(() =>
      useExchangeRates({ baseCurrency: base, compareList: compare, selectedDate }),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(Object.keys(result.current.series)).toEqual(["USD", "EUR"]);
    expect(result.current.series.USD).toHaveLength(7);
  });
});
