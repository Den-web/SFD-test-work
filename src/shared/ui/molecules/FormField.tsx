"use client";
import { Form, Typography } from "antd";
import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function FormField({ label, children }: Props) {
  return (
    <Form.Item label={<Typography.Text strong>{label}</Typography.Text>}>{children}</Form.Item>
  );
}
