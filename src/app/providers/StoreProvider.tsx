"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/shared/store";
import HydrateExchange from "./hydrate/HydrateExchange";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <HydrateExchange />
      {children}
    </Provider>
  );
}
