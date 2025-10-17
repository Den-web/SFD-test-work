"use client";
import { Card, Statistic } from "antd";
import CardHeader from "@/shared/ui/molecules/CardHeader";

type Props = { title: string; value: number; suffix?: string };

export default function StatsCard({ title, value, suffix }: Props) {
  return (
    <Card>
      <CardHeader title={title} />
      <Statistic value={value} suffix={suffix} />
    </Card>
  );
}
