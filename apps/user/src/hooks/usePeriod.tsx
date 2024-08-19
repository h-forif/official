import { useMemo, useState } from 'react';

import dayjs from '@utils/dayjs';

import useInterval from './useInterval';

/**
 * 현재 시간 기준 주어진 기간 내에 있는지 확인합니다.
 * 주어진 기간은 시작일과 종료일을 포함합니다.
 * 시작일과 종료일은 'YYYY-MM-DD' 형식의 문자열로 주어져야 합니다.
 * e.g. usePeriod('2021-08-01', '2021-08-31')
 *
 * @param {string} startDate - The start date of the period.
 * @param {string} endDate - The end date of the period.
 */
export function usePeriod(startDate: string, endDate: string) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  useInterval(() => {
    setCurrentDate(dayjs());
  }, 60000);

  const isIncluded = useMemo(() => {
    const start = dayjs(startDate);
    const end = dayjs(endDate).add(1, 'day');

    return (
      (currentDate.isAfter(start) || currentDate.isSame(start, 'day')) &&
      (currentDate.isBefore(end) || currentDate.isSame(end, 'day'))
    );
  }, [currentDate, startDate, endDate]);

  return { currentDate, isIncluded };
}
