import "../styles/globals.css";
import React from "react";
import StoreProvider from "./providers/StoreProvider";
import { ConfigProvider } from "antd";
import { customTheme } from "@/styles/theme";

export const metadata = {
  title: "Exchange Rates Admin",
  description: "Admin panel scaffold",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider theme={customTheme}>
          <StoreProvider>{children}</StoreProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
