import dayjs, { Dayjs } from 'dayjs';
import z from 'zod';

export const ApplyMemberSchema = z
  .object({
    primary_study: z.string().min(1, '1순위 스터디는 필수값입니다.'),
    primary_intro: z.string().optional(),
    secondary_study: z.string().optional(),
    secondary_intro: z.string().optional(),
    apply_path: z.string().min(1, '지원 경로는 필수값입니다.'),
    is_primary_study_only: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // 1순위 스터디가 자율스터디가 아닌 경우 1순위 소개글에 대한 검증 진행
    if (data.primary_study !== '0') {
      if (!data.primary_intro || data.primary_intro.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          message: '50자 이상 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['primary_intro'],
        });
        return false;
      }
      if (!data.primary_intro || data.primary_intro.length > 500) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 500,
          message: '500자 이하로 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['primary_intro'],
        });
        return false;
      }
    } else {
      // 1순위 스터디가 자율스터디인 경우 나머지 검증 생략
      return true;
    }
    // 1순위 스터디에 선발되지 않은 경우 2순위 스터디를 수강
    if (!data.is_primary_study_only) {
      // 2순위 스터디가 자율스터디라면 2순위 소개글 검증 생략
      if (data.secondary_study === '0') {
        return true;
      }
      // 2순위 스터디가 자율스터디가 아닌 경우 2순위 소개글에 대한 검증 진행
      if (!data.secondary_intro || data.secondary_intro.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          message: '50자 이상 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['secondary_intro'],
        });
        return false;
      }
      if (!data.secondary_intro || data.secondary_intro.length > 500) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 500,
          message: '500자 이하로 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['secondary_intro'],
        });
        return false;
      }
    }
    return true;
  });

export const ApplyMentorSchema = z
  .object({
    name: z
      .string()
      .min(1, '개설하시고자 하는 스터디 이름을 입력해주세요.')
      .max(25, '스터디 이름은 25자 이하로 입력해주세요.'),
    one_liner: z
      .string()
      .min(1, '한 줄 소개를 입력해주세요.')
      .max(150, '150자 이하로 입력해주세요.'),
    difficulty: z.string().min(1, '스터디 난이도를 선택해주세요.'),
    location: z.string().min(1, '스터디 장소를 입력해주세요.'),
    primary_mentor_name: z.string().min(1, '이름을 입력해주세요.'),
    primary_mentor_id: z.string().length(10, '학번은 10자리여야 합니다.'),
    secondary_mentor: z.boolean().optional(),
    secondary_mentor_name: z.string().optional(),
    secondary_mentor_id: z.string().optional(),
    explanation: z.string().min(50, '50자 이상 입력해주세요.'),
    start_time: z.custom<Dayjs>(
      (val) => val instanceof dayjs,
      '올바르지 않은 형식입니다.',
    ),
    end_time: z.custom<Dayjs>(
      (val) => val instanceof dayjs,
      '올바르지 않은 형식입니다.',
    ),
    week_day: z.string().min(1, '스터디 요일을 선택해주세요.'),
    study_plans: z.custom<StudyPlan[]>((val) => {
      if (val.length !== 8) {
        return false;
      }
      for (const plan of val) {
        if (plan.contents.length < 50) {
          return false;
        }
      }
      return true;
    }),
  })
  .superRefine((data, ctx) => {
    if (data.secondary_mentor) {
      if (
        !data.secondary_mentor_name ||
        data.secondary_mentor_name.length < 1
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          message: '함께 하는 멘토의 이름을 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['secondary_mentor_name'],
        });
      }
      if (!data.secondary_mentor_id || data.secondary_mentor_id.length !== 10) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '학번은 10자리여야 합니다.',
          path: ['secondary_mentor_id'],
        });
      }
    }
  })
  .refine((data) => data.end_time.isAfter(data.start_time), {
    message: '종료 시간은 시작 시간보다 늦어야 합니다.',
    path: ['end_time'],
  });

export interface Application {
  timestamp: Date;
  primary_study: PrimaryStudy;
  secondary_study: SecondaryStudy;
  apply_path: string;
}

export interface PrimaryStudy {
  id: number;
  name: string;
  introduction: string;
  status: '승낙' | '대기';
}

export interface SecondaryStudy {
  id: number;
  name: string;
  introduction: string;
  status: '승낙' | '대기';
}

export interface StudyPlan {
  section: string;
  contents: string[];
}
