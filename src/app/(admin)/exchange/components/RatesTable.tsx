"use client";
import { Table, Typography, Alert } from "antd";
import { useAppSelector } from "../hooks/useStore";
import { useGetHistoricalRatesQuery } from "@/shared/api/endpoints/exchangeApi";

export default function RatesTable() {
  const { baseCurrency, selectedDate, targetCurrencies } = useAppSelector((s) => s.exchange);
  const { data, isLoading, error } = useGetHistoricalRatesQuery({
    base: baseCurrency,
    endDate: selectedDate,
    days: 7,
  });

  if (error) return <Alert type="error" message="Failed to load rates" />;

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

  const dataSource = (data?.dates || []).map((date) => {
    const row: any = { key: date, date };
    const map = data?.ratesByDate[date] || {};
    targetCurrencies.forEach((code) => {
      row[code] = map[code];
    });
    return row;
  });

  return (
    <div>
      <Typography.Title level={4}>
        {baseCurrency.toUpperCase()} vs selected currencies (last 7 days)
      </Typography.Title>
      <Table
        loading={isLoading}
        columns={columns as any}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
}
