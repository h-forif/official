export const team = {
  '전체 팀': 'all',
  회장단: 'executive',
  전략기획팀: 'strategy',
  마케팅팀: 'marketing',
  스터디관리팀: 'study',
  SW팀: 'software',
} as const;

export type TeamType = keyof typeof team;
