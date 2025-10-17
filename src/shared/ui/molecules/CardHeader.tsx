"use client";
import { Typography } from "antd";

type Props = { title: string; subtitle?: string };

export default function CardHeader({ title, subtitle }: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      {subtitle ? <Typography.Text type="secondary">{subtitle}</Typography.Text> : null}
    </div>
  );
}
