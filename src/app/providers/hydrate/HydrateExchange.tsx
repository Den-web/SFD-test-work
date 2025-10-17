"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hydrate } from "@/shared/store/slices/exchangeSlice";
import { readPersistedExchange } from "@/shared/store/middleware/persistExchange";

export default function HydrateExchange() {
  const dispatch = useDispatch();
  useEffect(() => {
    const persisted = readPersistedExchange();
    if (persisted) {
      dispatch(hydrate(persisted));
    }
  }, [dispatch]);
  return null;
}
