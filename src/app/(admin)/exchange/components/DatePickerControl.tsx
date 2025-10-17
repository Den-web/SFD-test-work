"use client";
import { DatePicker, Typography } from "antd";
import { clampToPast90Days, formatDate } from "@/shared/utils/date";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { setSelectedDate } from "@/shared/store/slices/exchangeSlice";

export default function DatePickerControl() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((s) => s.exchange.selectedDate);

  const onChange = (v: any) => {
    const jsDate = v ? new Date(v.toDate()) : new Date();
    const clamped = clampToPast90Days(jsDate);
    dispatch(setSelectedDate(formatDate(clamped)));
  };

  return (
    <div>
      <Typography.Text strong>End date (last 7 days)</Typography.Text>
      <div>
        <DatePicker onChange={onChange} value={selectedDate ? (selectedDate as any) : undefined} />
      </div>
    </div>
  );
}
