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

  const entries = Object.entries(currencies || {});
  const options = entries.map(([code, name]) => ({
    label: `${code.toUpperCase()} — ${name}`,
    value: code,
  }));
  const optionSet = new Set(entries.map(([code]) => code));
  const safeBaseValue = optionSet.has(baseCurrency) ? baseCurrency : undefined;
  const safeTargets = targetCurrencies.filter((c: string) => optionSet.has(c));

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <div>
        <Typography.Text strong>Base currency</Typography.Text>
        <Select
          showSearch
          placeholder="Select base"
          value={safeBaseValue}
          options={options}
          style={{ width: 360 }}
          loading={!currencies}
          virtual={false}
          optionFilterProp="label"
          onChange={(v: string) => dispatch(setBaseCurrency(v))}
        />
      </div>

      <div>
        <Typography.Text strong>Target currencies (3–7)</Typography.Text>
        <Select
          mode="multiple"
          value={safeTargets}
          options={options}
          style={{ width: 600 }}
          loading={!currencies}
          virtual={false}
          optionFilterProp="label"
          onSelect={(v: string) => dispatch(addTargetCurrency(v))}
          onDeselect={(v: string) => dispatch(removeTargetCurrency(v))}
        />
      </div>
    </Space>
  );
}
