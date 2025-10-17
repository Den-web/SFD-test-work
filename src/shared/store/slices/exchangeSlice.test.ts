import reducer, {
  addTargetCurrency,
  removeTargetCurrency,
  setBaseCurrency,
  DEFAULT_TARGETS,
} from "./exchangeSlice";

describe("exchangeSlice", () => {
  it("prevents removing below 3", () => {
    const state = reducer(undefined, { type: "unknown" });
    const after = reducer(
      { ...state, targetCurrencies: ["usd", "eur", "jpy"] },
      removeTargetCurrency("usd"),
    );
    expect(after.targetCurrencies.length).toBe(3);
  });

  it("prevents adding above 7", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.targetCurrencies.length).toBe(7);
    const after = reducer(state, addTargetCurrency("pln"));
    expect(after.targetCurrencies.length).toBe(7);
  });

  it("removes base from targets when base changes", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state.targetCurrencies).toContain("usd");
    const after = reducer(state, setBaseCurrency("usd"));
    expect(after.baseCurrency).toBe("usd");
    expect(after.targetCurrencies).not.toContain("usd");
  });
});
