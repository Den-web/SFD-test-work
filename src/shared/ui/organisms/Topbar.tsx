"use client";
import { Layout, Typography } from "antd";
import { APP_NAME } from "@/shared/utils/constants";

export default function Topbar() {
  return (
    <Layout.Header style={{ display: "flex", alignItems: "center" }}>
      <Typography.Text style={{ color: "#fff", fontWeight: 600 }}>{APP_NAME}</Typography.Text>
    </Layout.Header>
  );
}
