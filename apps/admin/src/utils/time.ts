import dayjs, { Dayjs } from 'dayjs';
// ISO week 기능을 제공하는 플러그인 import
import isoWeek from 'dayjs/plugin/isoWeek';

/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
export function getWeekDayAsString(dayIndex: number): string {
  return (
    ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'][
      dayIndex - 1
    ] || ''
  );
}

/**
 * Converts a time string to Korean format. (e.g. 18:00:00.000000 -> 오후 6시)
 *
 * @param {String} time
 * @return {String} Returns time in Korean format
 */
export const formatStudyTimeToKorean = (time: string | null): string => {
  if (!time) return '';
  const parts = time.split(':');
  const hour = parseInt(parts[0]!, 10);
  const minute = parseInt(parts[1]!, 10);
  const period = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour > 12 ? hour - 12 : hour;
  return `${period} ${formattedHour}시 ${minute > 0 ? `${minute}분` : ''}`;
};

dayjs.extend(isoWeek);

export function getWeekOfMonth(date: Dayjs) {
  const startOfMonth = dayjs(date).startOf('month');
  const startOfMonthWeek = startOfMonth.isoWeek();
  const currentWeek = dayjs(date).isoWeek();

  // 첫째 주를 무시하고 둘째 주부터 계산
  const weekDifference = currentWeek - startOfMonthWeek;

  // 9월 첫째 주가 9월 1일부터 시작하는 경우 조정
  if (startOfMonth.isoWeekday() !== 1) {
    return weekDifference;
  }

  // 주차를 1부터 시작하도록 조정
  return weekDifference >= 1 ? weekDifference : 1;
}
