/**
 * UTC 기준 날짜로 변환함 (시각 정보 제거)
 */
export function toUtcDateOnly(y: number, m: number, d: number): number {
  return Date.UTC(y, m - 1, d);
}

/**
 * 해당 날짜의 주기가 시작되는 UTC 날짜를 반환함
 */
export function getCycleStartUtc(targetDate: Date, startMonth: number, startDay: number): number {
  const y = targetDate.getFullYear();
  const startThisYearUtc = toUtcDateOnly(y, startMonth, startDay);
  const targetUtc = toUtcDateOnly(y, targetDate.getMonth() + 1, targetDate.getDate());
  
  return targetUtc < startThisYearUtc
    ? toUtcDateOnly(y - 1, startMonth, startDay)
    : startThisYearUtc;
}

/**
 * 지정된 날짜가 주기 시작일로부터 며칠째인지 계산함 (0-indexed)
 */
export function calcDayIndex(targetDate: Date, startMonth: number, startDay: number): number {
  const startUtc = getCycleStartUtc(targetDate, startMonth, startDay);
  const targetUtc = toUtcDateOnly(targetDate.getFullYear(), targetDate.getMonth() + 1, targetDate.getDate());
  return Math.floor((targetUtc - startUtc) / 86400000);
}

/**
 * 365일 범위 내에 있는지 확인함
 */
export function inRange(dayIndex: number): boolean {
  return dayIndex >= 0 && dayIndex < 365;
}

/**
 * DayIndex를 384효 번호로 매핑함 (1-indexed 1~384)
 * Day 0 (3/25) -> Yao 25
 */
export function calcYaoNum(dayIndex: number): number {
  return ((dayIndex + 24) % 384) + 1;
}

/**
 * Yao 번호를 64괘 번호로 매핑함 (1-indexed 1~64)
 */
export function calcGuaNum(yaoNum: number): number {
  return Math.floor((yaoNum - 1) / 6) + 1;
}
