/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
export function getWeekDayAsString(dayIndex: number) {
  return (
    [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일',
    ][dayIndex] || ''
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
