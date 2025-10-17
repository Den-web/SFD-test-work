"use client";
import { Layout } from "antd";
import Topbar from "../organisms/Topbar";
import Sidebar from "../organisms/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Topbar />
      <Layout>
        <Layout.Sider width={220} style={{ background: "#fff" }}>
          <Sidebar />
        </Layout.Sider>
        <Layout.Content style={{ padding: 24 }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
