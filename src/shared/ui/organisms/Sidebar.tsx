"use client";
import { Menu } from "antd";
import { ROUTES } from "@/shared/utils/constants";

export default function Sidebar() {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      items={[
        { key: "dashboard", label: "Dashboard", href: ROUTES.DASHBOARD },
        { key: "exchange", label: "Exchange", href: ROUTES.EXCHANGE },
      ]}
      style={{ height: "100%" }}
    />
  );
}
