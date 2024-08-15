import { StudyPlan } from '@packages/components/types/study';
import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

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
    tag: z.string().min(1, '태그를 선택해주세요'),
    week_day: z.string().min(1, '스터디 요일을 선택해주세요.'),
    study_apply_plans: z.custom<StudyPlan[]>((val) => {
      if (val.length !== 8) {
        return false;
      }
      for (const plan of val) {
        if (plan.content.length < 50) {
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
