import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatDate } from "@/shared/utils/date";

export type ExchangeState = {
  baseCurrency: string; // e.g. "gbp"
  selectedDate: string; // yyyy-MM-dd
  targetCurrencies: string[]; // e.g. ["usd","eur",...]
};

export const DEFAULT_TARGETS = ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"] as const;

const initialState: ExchangeState = {
  baseCurrency: "gbp",
  selectedDate: formatDate(new Date()),
  targetCurrencies: [...DEFAULT_TARGETS],
};

const MIN_TARGETS = 3;
const MAX_TARGETS = 7;

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setBaseCurrency(state, action: PayloadAction<string>) {
      const next = action.payload.toLowerCase();
      state.baseCurrency = next;
      // Ensure base is not in targets
      state.targetCurrencies = state.targetCurrencies.filter((c) => c !== next);
      // Ensure min length
      if (state.targetCurrencies.length < MIN_TARGETS) {
        // no-op here; UI will enforce add
      }
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    addTargetCurrency(state, action: PayloadAction<string>) {
      const code = action.payload.toLowerCase();
      if (
        state.targetCurrencies.includes(code) ||
        code === state.baseCurrency ||
        state.targetCurrencies.length >= MAX_TARGETS
      )
        return;
      state.targetCurrencies.push(code);
    },
    removeTargetCurrency(state, action: PayloadAction<string>) {
      if (state.targetCurrencies.length <= MIN_TARGETS) return;
      state.targetCurrencies = state.targetCurrencies.filter((c) => c !== action.payload);
    },
  },
});

export const { setBaseCurrency, setSelectedDate, addTargetCurrency, removeTargetCurrency } =
  exchangeSlice.actions;
export default exchangeSlice.reducer;
