import z from 'zod';

export const ApplyMemberSchema = z
  .object({
    primaryStudy: z.string().min(1, '1순위 스터디는 필수값입니다.'),
    primaryIntro: z.string().optional(),
    secondaryStudy: z.string().optional(),
    secondaryIntro: z.string().optional(),
    applyPath: z.string().min(1, '지원 경로는 필수값입니다.'),
    isPrimaryStudyOnly: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // 1순위 스터디가 자율스터디가 아닌 경우 1순위 소개글에 대한 검증 진행
    if (data.primaryStudy !== '0') {
      if (!data.primaryIntro || data.primaryIntro.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          message: '50자 이상 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['primaryIntro'],
        });
        return false;
      }
      if (!data.primaryIntro || data.primaryIntro.length > 500) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 500,
          message: '500자 이하로 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['primaryIntro'],
        });
        return false;
      }
    } else {
      // 1순위 스터디가 자율스터디인 경우 나머지 검증 생략
      return true;
    }
    // 1순위 스터디에 선발되지 않은 경우 2순위 스터디를 수강
    if (!data.isPrimaryStudyOnly) {
      // 2순위 스터디가 자율스터디라면 2순위 소개글 검증 생략
      if (data.secondaryStudy === '0') {
        return true;
      }
      // 2순위 스터디가 자율스터디가 아닌 경우 2순위 소개글에 대한 검증 진행
      if (!data.secondaryIntro || data.secondaryIntro.length < 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 50,
          message: '50자 이상 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['secondaryIntro'],
        });
        return false;
      }
      if (!data.secondaryIntro || data.secondaryIntro.length > 500) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 500,
          message: '500자 이하로 입력해주세요.',
          inclusive: true,
          type: 'string',
          path: ['secondaryIntro'],
        });
        return false;
      }
    }
    return true;
  });

export interface Application {
  timestamp: Date;
  primaryStudy: PrimaryStudy;
  secondaryStudy: SecondaryStudy;
  applyPath: string;
}

export interface PrimaryStudy {
  id: number;
  name: string;
  introduction: string;
}

export interface SecondaryStudy {
  id: number;
  name: string;
  introduction: string;
}
