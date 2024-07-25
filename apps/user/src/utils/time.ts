/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
export function getWeekDayAsString(dayIndex: number) {
  return (
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][
      dayIndex
    ] || ''
  );
}

export const formatStudyTimeToKorean = (time: string): string => {
  const hour = parseInt(time.split(':')[0]!, 10);
  const minute = parseInt(time.split(':')[1]!, 10);
  const period = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour > 12 ? hour - 12 : hour;
  return `${period} ${formattedHour}시 ${minute > 0 ? `${minute}분` : ''}`;
};
