import CurrenciesPicker from "./components/CurrenciesPicker";
import DatePickerControl from "./components/DatePickerControl";
import RatesTable from "./components/RatesTable";

export default function ExchangePage() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div style={{ display: "flex", gap: 24 }}>
        <CurrenciesPicker />
        <DatePickerControl />
      </div>
      <RatesTable />
    </div>
  );
}
