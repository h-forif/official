const POSSIBLE_YEARS = [2024, 2023];
const SEMESTERS = [1, 2];
const DIFFICULTY = {
  전체: 0,
  쉬움: 1,
  '약간 쉬움': 2,
  중간: 3,
  '약간 어려움': 4,
  어려움: 5,
} as const;

export type DIFFICULTY_TYPES = (typeof DIFFICULTY)[keyof typeof DIFFICULTY];

export { DIFFICULTY, POSSIBLE_YEARS, SEMESTERS };
