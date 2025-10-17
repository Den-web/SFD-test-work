"use client";
import { Select, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import {
  addTargetCurrency,
  removeTargetCurrency,
  setBaseCurrency,
} from "@/shared/store/slices/exchangeSlice";
import { useGetCurrenciesQuery } from "@/shared/api/endpoints/exchangeApi";

export default function CurrenciesPicker() {
  const dispatch = useAppDispatch();
  const { baseCurrency, targetCurrencies } = useAppSelector((s) => s.exchange);
  const { data: currencies } = useGetCurrenciesQuery();

  const options = Object.entries(currencies || {}).map(([code, name]) => ({
    label: `${code.toUpperCase()} — ${name}`,
    value: code,
  }));

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div>
        <Typography.Text strong>Base currency</Typography.Text>
        <Select
          showSearch
          placeholder="Select base"
          value={baseCurrency}
          options={options}
          style={{ width: 360 }}
          onChange={(v) => dispatch(setBaseCurrency(v))}
        />
      </div>

      <div>
        <Typography.Text strong>Target currencies (3–7)</Typography.Text>
        <Select
          mode="multiple"
          value={targetCurrencies}
          options={options}
          style={{ width: 600 }}
          onSelect={(v) => dispatch(addTargetCurrency(v))}
          onDeselect={(v) => dispatch(removeTargetCurrency(v))}
        />
      </div>
    </Space>
  );
}
