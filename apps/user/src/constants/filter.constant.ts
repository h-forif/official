import { SelectOption } from '@packages/components/Select';

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

const MENTOR_DIFFICULTY = {
  ...Object.fromEntries(
    Object.entries(DIFFICULTY).filter(([key]) => key !== '전체'),
  ),
  '운영진의 판단에 맡김': 6,
};

const MENTOR_DIFFICULTY_OPTIONS: SelectOption[] = Object.entries(
  MENTOR_DIFFICULTY,
).map(([key, value]) => ({ label: key, value: value.toString() }));

export { DIFFICULTY, MENTOR_DIFFICULTY_OPTIONS, POSSIBLE_YEARS, SEMESTERS };
