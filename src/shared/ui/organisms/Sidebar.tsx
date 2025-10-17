"use client";
import { Menu } from "antd";
import { ROUTES } from "@/shared/utils/constants";
import Link from "next/link";

export default function Sidebar() {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={[
        { key: "dashboard", label: <Link href={ROUTES.DASHBOARD}>Dashboard</Link> },
        { key: "exchange", label: <Link href={ROUTES.EXCHANGE}>Exchange</Link> },
      ]}
      style={{ height: "100%" }}
    />
  );
}
