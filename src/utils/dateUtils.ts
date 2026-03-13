/**
 * UTC 기준 날짜로 변환함 (시각 정보 제거)
 */
export function toUtcDateOnly(y: number, m: number, d: number): number {
  return Date.UTC(y, m - 1, d);
}

/**
 * 해당 날짜의 주기가 시작되는 UTC 날짜를 반환함 (매년 4월 7일 기준)
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
 * 365일 범위 내에 있는지 확인함
 */
export function inRange(dayIndex: number): boolean {
  return dayIndex >= 0 && dayIndex < 365;
}

/**
 * 날짜를 384효 번호로 매핑함 (1-indexed 1~384)
 * 규정: 4월 7일 = 효사 25번 시작, 1:1 대응 (360일간)
 * 4월 2일 ~ 4월 6일은 비움 (null 반환)
 */
export function calcYaoNum(date: Date): number | null {
  const startUtc = getCycleStartUtc(date, 4, 7);
  const targetUtc = toUtcDateOnly(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const diffDays = Math.floor((targetUtc - startUtc) / 86400000);

  // 4월 7일(0일차) ~ 차년도 4월 1일까지가 360효 (25~384) 구간임
  if (diffDays >= 0 && diffDays < 360) {
    return 25 + diffDays;
  }

  // 4월 2일 ~ 4월 6일 구간 (1~24번 효사 부재)
  return null;
}

/**
 * Yao 번호를 64괘 번호로 매핑함 (1-indexed 1~64)
 */
export function calcGuaNum(yaoNum: number | null): number | null {
  if (yaoNum === null) return null;
  return Math.floor((yaoNum - 1) / 6) + 1;
}
