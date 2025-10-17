export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getDateRange(endDate: Date, days: number): string[] {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const dt = new Date(endDate);
    dt.setDate(dt.getDate() - i);
    dates.push(formatDate(dt));
  }
  return dates;
}

export function clampToPast90Days(date: Date): Date {
  const nowMs = Date.now();
  const now = new Date(nowMs);
  const min = new Date(nowMs);
  min.setDate(min.getDate() - 90);
  if (date.getTime() > nowMs) return new Date(nowMs);
  if (date < min) return min;
  return date;
}
