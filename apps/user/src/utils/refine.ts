import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

/**
 * Refines the apply form data based on certain conditions.
 * @param {Application} params - The parameters for refining the apply form.
 * @param {Application} params.application - The application data.
 * @param {Application} params.timestamp - The last timestamp of the application.
 * @returns {Application} - The refined form data.
 */
export function refineApplyForm(
  application: z.infer<typeof ApplyMemberSchema>,
): z.infer<typeof ApplyMemberSchema> {
  const {
    apply_path,
    primary_study,
    is_primary_study_only,
    primary_intro,
    secondary_study,
    secondary_intro,
  } = application;
  let formData = {};
  // 1순위 스터디 불합격 시 2순위 스터디 미지원
  if (is_primary_study_only) {
    formData = {
      primary_study: primary_study,
      primary_intro: primary_intro,
      secondary_intro: null,
      secondary_study: null,
      apply_path: apply_path,
    };
  }
  // 1순위 스터디 불합격 시 2순위 스터디 지원
  else {
    formData = {
      primary_study: primary_study,
      primary_intro: primary_intro,
      secondary_intro: secondary_intro,
      secondary_study: secondary_study,
      apply_path: apply_path,
    };
  }
  // 1순위 스터디가 자율스터디
  if (primary_study === '0') {
    formData = {
      primary_study: 0,
      primary_intro: '',
      secondary_intro: null,
      secondary_study: null,
      apply_path: apply_path,
    };
  }
  // 2순위 스터디가 자율스터디
  if (secondary_intro === '0') {
    formData = {
      primary_study: primary_study,
      primary_intro: primary_intro,
      secondary_intro: 0,
      secondary_study: null,
      apply_path: apply_path,
    };
  }
  const newApplication = formData as z.infer<typeof ApplyMemberSchema>;
  return newApplication;
}
