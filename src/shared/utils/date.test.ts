import { clampToPast90Days, formatDate, getDateRange } from "./date";

describe("date utils", () => {
  it("formats date to yyyy-MM-dd", () => {
    const d = new Date("2024-03-02T12:00:00Z");
    expect(formatDate(d)).toBe("2024-03-02");
  });

  it("returns range of 7 dates ending today", () => {
    const today = new Date("2024-03-08T00:00:00Z");
    const range = getDateRange(today, 7);
    expect(range).toHaveLength(7);
    expect(range[0]).toBe("2024-03-02");
    expect(range[6]).toBe("2024-03-08");
  });

  it("clamps to past 90 days and not future", () => {
    const fixedNow = new Date("2025-10-17T00:00:00.000Z").getTime();
    const spy = jest.spyOn(Date, "now").mockReturnValue(fixedNow);

    const now = new Date(fixedNow);
    const tooOld = new Date(fixedNow);
    tooOld.setDate(now.getDate() - 120);
    const future = new Date(fixedNow);
    future.setDate(now.getDate() + 5);

    expect(clampToPast90Days(tooOld).getTime()).toBeGreaterThanOrEqual(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90).getTime(),
    );
    expect(clampToPast90Days(future).getTime()).toBeLessThanOrEqual(now.getTime());

    spy.mockRestore();
  });
});
