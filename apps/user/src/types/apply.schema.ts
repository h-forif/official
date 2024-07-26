import z from 'zod';

export const ApplyMemberSchema = z
  .object({
    primaryStudy: z.string().min(1, '1순위 스터디는 필수값입니다.'),
    primaryIntro: z
      .string()
      .min(50, '50자 이상 입력해주세요.')
      .max(500, '500자 이하로 입력해주세요.'),
    secondaryStudy: z.string().optional(),
    secondaryIntro: z.string().optional(),
    applyPath: z.string().min(1, '지원 경로는 필수값입니다.'),
    isPrimaryStudyOnly: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.isPrimaryStudyOnly) {
        // 2순위 스터디를 수강할 것이고
        return (
          data.secondaryStudy && // 2순위 스터디가 선택되었고
          data.secondaryStudy !== '0' && // 2순위 스터디가 '자율스터디'가 아니고
          data.secondaryIntro && // 2순위 스터디 및 사유가 입력되었으며
          data.secondaryIntro.length >= 50 && // 2순위 스터디의 사유가 50자 이상이고
          data.secondaryIntro.length <= 500 // 2순위 스터디의 사유가 500자 이하일 때 참
        );
      }
      return true;
    },
    {
      message: '2순위 스터디 및 사유를 올바르게 입력해주세요.',
      path: ['secondaryStudy', 'secondaryIntro'],
    },
  );
