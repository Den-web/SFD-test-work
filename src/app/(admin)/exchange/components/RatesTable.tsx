"use client";
import { Table, Typography, Alert } from "antd";
import { useAppSelector } from "../hooks/useStore";
import { useExchangeRates } from "@/shared/hooks/useExchangeRates";
import type { ColumnsType } from "antd/es/table";

type RowRecord = {
  key: string;
  date: string;
  [currencyCode: string]: string | number | undefined;
};

export default function RatesTable() {
  const { baseCurrency, selectedDate, targetCurrencies } = useAppSelector((s) => s.exchange);
  const { loading, error, series, dates } = useExchangeRates({
    baseCurrency,
    compareList: targetCurrencies,
    selectedDate,
  });

  if (error) return <Alert type="error" message={error} />;

  const columns: ColumnsType<RowRecord> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    ...targetCurrencies.map((code: string) => ({
      title: code.toUpperCase(),
      dataIndex: code,
      key: code,
      render: (val: number | undefined) => (val ? val.toFixed(4) : "—"),
    })),
  ];

  const dataSource: RowRecord[] = (dates || []).map((date: string, idx: number) => {
    const row: RowRecord = { key: date, date };
    targetCurrencies.forEach((code: string) => {
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
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
}
