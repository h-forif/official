const POSSIBLE_YEARS = [2024, 2023];
const SEMESTERS = [1, 2];
const LEVELS: LEVEL_TYPES = [
  '전체',
  '쉬움',
  '약간 쉬움',
  '보통',
  '약간 어려움',
  '어려움',
];
type LEVEL_TYPES = [
  '전체',
  '쉬움',
  '약간 쉬움',
  '보통',
  '약간 어려움',
  '어려움',
];

export { LEVELS, POSSIBLE_YEARS, SEMESTERS };
export type { LEVEL_TYPES };
