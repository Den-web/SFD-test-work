import { useEffect, useMemo, useState } from "react";
import { getDateRange } from "@/shared/utils/date";

type UseExchangeArgs = {
  baseCurrency: string;
  compareList: string[];
  selectedDate: string; // yyyy-MM-dd
};

export type ExchangeSeries = Record<string, number[]>; // { USD: [..], EUR: [..] }

export function useExchangeRates({ baseCurrency, compareList, selectedDate }: UseExchangeArgs) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [series, setSeries] = useState<ExchangeSeries>({});

  const dates = useMemo(() => getDateRange(new Date(selectedDate), 7), [selectedDate]);

  useEffect(() => {
    let cancelled = false;
    async function runSequential() {
      setLoading(true);
      setError(null);
      const result: ExchangeSeries = Object.fromEntries(
        compareList.map((c) => [c.toUpperCase(), [] as number[]]),
      );
      try {
        for (const date of dates) {
          const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${baseCurrency}.json`;
          const res = await fetch(url);
          if (!res.ok) throw new Error(`Failed to fetch ${date}`);
          const json = (await res.json()) as any;
          const map: Record<string, number> = json[baseCurrency];
          for (const code of compareList) {
            const key = code.toUpperCase();
            const v = map?.[code] ?? undefined;
            result[key].push(typeof v === "number" ? v : NaN);
          }
          if (cancelled) return;
        }
        if (!cancelled) setSeries(result);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    runSequential();
    return () => {
      cancelled = true;
    };
  }, [baseCurrency, compareList, dates]);

  return { loading, error, series, dates };
}
