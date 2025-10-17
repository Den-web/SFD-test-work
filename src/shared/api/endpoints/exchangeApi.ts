import { baseApi } from "@/shared/api/baseApi";
import { getDateRange } from "@/shared/utils/date";

const BASE_CDN = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@";

export type CurrenciesMap = Record<string, string>;
export type RatesMap = Record<string, number>;

export type HistoricalRatesArgs = {
  base: string;
  endDate: string; // yyyy-MM-dd
  days: number; // typically 7
};

export type HistoricalRatesResult = {
  dates: string[];
  ratesByDate: Record<string, RatesMap>;
};

export const exchangeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<CurrenciesMap, void>({
      async queryFn() {
        try {
          const res = await fetch(`${BASE_CDN}latest/v1/currencies.json`);
          if (!res.ok) throw new Error("Failed to fetch currencies");
          const data = (await res.json()) as CurrenciesMap;
          return { data };
        } catch (error: any) {
          return { error };
        }
      },
    }),
    getHistoricalRates: builder.query<HistoricalRatesResult, HistoricalRatesArgs>({
      async queryFn({ base, endDate, days }) {
        try {
          const dates = getDateRange(new Date(endDate), days);
          const requests = dates.map(async (date) => {
            const url = `${BASE_CDN}${date}/v1/currencies/${base}.json`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch rates for ${date}`);
            const json = (await res.json()) as Record<string, RatesMap>;
            const map = json[base] as RatesMap;
            return [date, map] as const;
          });
          const entries = await Promise.all(requests);
          const ratesByDate: Record<string, RatesMap> = Object.fromEntries(entries);
          return { data: { dates, ratesByDate } };
        } catch (error: any) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetCurrenciesQuery, useGetHistoricalRatesQuery } = exchangeApi;
