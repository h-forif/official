import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

export function refineApplyForm({
  applyPath,
  primaryIntro,
  primaryStudy,
  isPrimaryStudyOnly,
  secondaryIntro,
  secondaryStudy,
}: z.infer<typeof ApplyMemberSchema>) {
  let formData = {};
  // 1순위 스터디 불합격 시 2순위 스터디 미지원
  if (isPrimaryStudyOnly) {
    formData = {
      primary_study: primaryStudy,
      primary_intro: primaryIntro,
      secondary_study: null,
      secondary_intro: null,
      apply_path: applyPath,
    };
  }
  // 1순위 스터디 불합격 시 2순위 스터디 지원
  else {
    formData = {
      primary_study: primaryStudy,
      primary_intro: primaryIntro,
      secondary_study: secondaryStudy,
      secondary_intro: secondaryIntro,
      apply_path: applyPath,
    };
  }
  // 1순위 스터디가 자율스터디
  if (primaryStudy === '0') {
    formData = {
      primary_study: 0,
      primary_intro: null,
      secondary_study: null,
      secondary_intro: null,
      apply_path: applyPath,
    };
  }
  // 2순위 스터디가 자율스터디
  if (secondaryStudy === '0') {
    formData = {
      primary_study: primaryStudy,
      primary_intro: primaryIntro,
      secondary_study: 0,
      secondary_intro: null,
      apply_path: applyPath,
    };
  }
  return formData;
}
