"use client";
import { Table, Typography, Alert } from "antd";
import { useAppSelector } from "../hooks/useStore";
import { useExchangeRates } from "@/shared/hooks/useExchangeRates";

export default function RatesTable() {
  const { baseCurrency, selectedDate, targetCurrencies } = useAppSelector((s) => s.exchange);
  const { loading, error, series, dates } = useExchangeRates({
    baseCurrency,
    compareList: targetCurrencies,
    selectedDate,
  });

  if (error) return <Alert type="error" message={error} />;

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    ...targetCurrencies.map((code) => ({
      title: code.toUpperCase(),
      dataIndex: code,
      key: code,
      render: (val: number | undefined) => (val ? val.toFixed(4) : "—"),
    })),
  ];

  const dataSource = (dates || []).map((date, idx) => {
    const row: any = { key: date, date };
    targetCurrencies.forEach((code) => {
      const key = code.toUpperCase();
      row[code] = series[key]?.[idx];
    });
    return row;
  });

  return (
    <div>
      <Typography.Title level={4}>
        {baseCurrency.toUpperCase()} vs selected currencies (last 7 days)
      </Typography.Title>
      <Table
        loading={loading}
        columns={columns as any}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
}
