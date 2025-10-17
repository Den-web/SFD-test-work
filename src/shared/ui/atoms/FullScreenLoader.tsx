"use client";
import { Spin } from "antd";

export default function FullScreenLoader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.7)",
        zIndex: 2000,
      }}
    >
      <Spin size="large" />
    </div>
  );
}
