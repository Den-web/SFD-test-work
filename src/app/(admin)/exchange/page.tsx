import CurrenciesPicker from "./components/CurrenciesPicker";
import DatePickerControl from "./components/DatePickerControl";
import RatesTable from "./components/RatesTable";
import { useGetCurrenciesQuery } from "@/shared/api/endpoints/exchangeApi";
import FullScreenLoader from "@/shared/ui/atoms/FullScreenLoader";

export default function ExchangePage() {
  const { isLoading } = useGetCurrenciesQuery();

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {isLoading ? <FullScreenLoader /> : null}
      <div style={{ display: "flex", gap: 24 }}>
        <CurrenciesPicker />
        <DatePickerControl />
      </div>
      <RatesTable />
    </div>
  );
}
