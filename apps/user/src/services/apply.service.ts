import {
  Application,
  ApplyMemberSchema,
  ApplyMentorSchema,
} from 'src/types/apply.schema';
import { z } from 'zod';

import { authApi } from './axios-instance';

export const applyMember = async (
  application: z.infer<typeof ApplyMemberSchema>,
) => {
  await authApi.post(`/applications`, {
    primary_study: Number(application.primary_study),
    primary_intro: application.primary_intro,
    secondary_study:
      application.secondary_study === null
        ? null
        : Number(application.secondary_study),
    secondary_intro: application.secondary_intro,
    apply_path: application.apply_path,
  });
};

export const getApplication = async () => {
  const application: Application = await authApi
    .get('/applications/me')
    .then((res) => res.data);
  return application;
};

export const updateApplication = async (
  application: z.infer<typeof ApplyMemberSchema>,
) => {
  await authApi
    .patch(`/applications/me`, {
      primary_study: Number(application.primary_study),
      primary_intro: application.primary_intro,
      secondary_study:
        application.secondary_study === null
          ? null
          : Number(application.secondary_study),
      secondary_intro: application.secondary_intro,
      apply_path: application.apply_path,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export interface MentorApplication
  extends Omit<
    z.infer<typeof ApplyMentorSchema>,
    'study_apply_plans' | 'start_time' | 'end_time'
  > {
  study_apply_plans: { section: string; content: string }[];
  start_time: string;
  end_time: string;
}
/**
 * 스터디 개설 신청 API 요청 함수
 * @param formData
 * @returns
 */
export const applyStudy = async (formData: MentorApplication) => {
  const res = await authApi.post(`/study-apply`, formData);
  return res;
};

export const getAppliedStudies = async () => {
  const data: MentorApplication[] = await authApi
    .get(`/study-apply`)
    .then((res) => res.data);
  return data;
};
