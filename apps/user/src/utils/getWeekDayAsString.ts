/**
 * Converts a day number to a string.
 *
 * @param {Number} dayIndex
 * @return {String} Returns day as string
 */
function getWeekDayAsString(dayIndex: number) {
  return (
    ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][
      dayIndex
    ] || ''
  );
}

export default getWeekDayAsString;
