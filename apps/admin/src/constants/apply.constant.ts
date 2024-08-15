import { SelectOption } from '@packages/components/Select';

export const MENTOR_DIFFICULTY_OPTIONS: Record<number, string> = {
  1: '쉬움',
  2: '약간 쉬움',
  3: '중간',
  4: '약간 어려움',
  5: '어려움',
  6: '운영진의 판단에 맡김',
};

export const TAG_OPTIONS: SelectOption[] = [
  {
    value: 'database',
    label: '데이터베이스',
  },
  {
    value: 'basic',
    label: '프로그래밍 기초',
  },
  {
    value: 'frontend',
    label: '프론트엔드',
  },
  {
    value: 'backend',
    label: '백엔드',
  },
  {
    value: 'fullstack',
    label: '풀스택',
  },
  {
    value: 'app',
    label: '앱',
  },
  {
    value: 'ai',
    label: '인공지능',
  },
  {
    value: 'data',
    label: '데이터',
  },
  {
    value: 'security',
    label: '보안',
  },
  {
    value: 'game',
    label: '게임',
  },
  {
    value: 'design',
    label: '디자인',
  },
];

export const WEEKDAYS_OPTIONS: SelectOption[] = [
  {
    value: '1',
    label: '월',
  },
  {
    value: '2',
    label: '화',
  },
  {
    value: '3',
    label: '수',
  },
  {
    value: '4',
    label: '목',
  },
  {
    value: '5',
    label: '금',
  },
  {
    value: '6',
    label: '토',
  },
  {
    value: '7',
    label: '일',
  },
];
