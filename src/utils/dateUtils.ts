/**
 * Converts a local year/month/day triple into a UTC date-only timestamp.
 */
export function toUtcDateOnly(y: number, m: number, d: number): number {
  return Date.UTC(y, m - 1, d);
}

/**
 * Returns the cycle start date for the given year, defaulting to April 7.
 */
export function getCycleStartUtc(targetDate: Date, startMonth: number = 4, startDay: number = 7): number {
  const y = targetDate.getFullYear();
  const startThisYearUtc = toUtcDateOnly(y, startMonth, startDay);
  const targetUtc = toUtcDateOnly(y, targetDate.getMonth() + 1, targetDate.getDate());

  return targetUtc < startThisYearUtc
    ? toUtcDateOnly(y - 1, startMonth, startDay)
    : startThisYearUtc;
}

/**
 * True when a zero-based day index is inside the 365-day cycle window.
 */
export function inRange(dayIndex: number): boolean {
  return dayIndex >= 0 && dayIndex < 365;
}

/**
 * Maps a date into the 1-indexed yao sequence.
 * Valid dates run from April 7 to April 1 of the following year and map to 25..384.
 * April 2 through April 6 intentionally return null.
 */
export function calcYaoNum(date: Date): number | null {
  const startUtc = getCycleStartUtc(date, 4, 7);
  const targetUtc = toUtcDateOnly(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const diffDays = Math.floor((targetUtc - startUtc) / 86400000);

  if (diffDays >= 0 && diffDays < 360) {
    return 25 + diffDays;
  }

  return null;
}

/**
 * Maps a yao number into a 1-indexed gua number.
 */
export function calcGuaNum(yaoNum: number | null): number | null {
  if (yaoNum === null) return null;
  return Math.floor((yaoNum - 1) / 6) + 1;
}
