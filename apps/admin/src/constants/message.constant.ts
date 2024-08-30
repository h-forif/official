import { SelectOption } from '@packages/components/Select';

export const REGULAR_STUDY_PASS_TEMPLATE_CODE =
  'KA01TP2408241717391498BiBIICCHkD';
export const AUTONOMOUS_STUDY_PASS_TEMPLATE_CODE =
  'KA01TP240824172242899ekg973cfZlM';
export const REGULAR_STUDY_FAIL_TEMPLATE_CODE =
  'KA01TP240824172620691rLAdqG6sZPt';
export const URGENT_TEMPLATE_CODE = 'KA01TP240826055858319jLZ0e8yiqsN';

export const PASS_MESSAGE_TEMPLATE_OPTIONS: SelectOption[] = [
  {
    value: REGULAR_STUDY_PASS_TEMPLATE_CODE,
    label: '정규스터디 합격 템플릿',
  },
  {
    value: AUTONOMOUS_STUDY_PASS_TEMPLATE_CODE,
    label: '자율부원 합격 템플릿',
  },
];

export const FAIL_MESSAGE_TEMPLATE_OPTIONS: SelectOption[] = [
  {
    value: REGULAR_STUDY_FAIL_TEMPLATE_CODE,
    label: '정규스터디 불합격 템플릿',
  },
];

export const ETC_MESSAGE_TEMPLATE_OPTIONS: SelectOption[] = [
  {
    value: URGENT_TEMPLATE_CODE,
    label: '미등록 부원 대상 재촉 템플릿',
  },
];

export const ALL_MESSAGE_TEMPLATE_OPTIONS: SelectOption[] = [
  ...PASS_MESSAGE_TEMPLATE_OPTIONS,
  ...FAIL_MESSAGE_TEMPLATE_OPTIONS,
  ...ETC_MESSAGE_TEMPLATE_OPTIONS,
];
