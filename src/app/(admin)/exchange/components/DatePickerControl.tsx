"use client";
import { DatePicker, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { clampToPast90Days, formatDate } from "@/shared/utils/date";
import { useAppDispatch, useAppSelector } from "../hooks/useStore";
import { setSelectedDate } from "@/shared/store/slices/exchangeSlice";

export default function DatePickerControl() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((s) => s.exchange.selectedDate);

  const onChange = (v: Dayjs | null) => {
    const jsDate = v ? new Date(v.toDate()) : new Date();
    const clamped = clampToPast90Days(jsDate);
    dispatch(setSelectedDate(formatDate(clamped)));
  };

  return (
    <div>
      <Typography.Text strong>End date (last 7 days)</Typography.Text>
      <div>
        <DatePicker
          onChange={onChange}
          value={selectedDate ? dayjs(selectedDate) : undefined}
          disabledDate={(d) => {
            const now = dayjs();
            const min = now.subtract(90, "day");
            return d.isAfter(now, "day") || d.isBefore(min, "day");
          }}
        />
      </div>
    </div>
  );
}
