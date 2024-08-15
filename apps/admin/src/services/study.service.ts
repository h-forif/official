import { Study } from '@packages/components/types/study';
import { AxiosResponse } from 'axios';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { api, authApi } from './axios-instance';

export interface StudySearch {
  year: number;
  semester: number;
}
/**
 * 제공된 스터디 ID를 기반으로 스터디 정보를 가져옵니다.
 * @param studyId - 정보를 가져올 스터디의 ID입니다.
 * @returns 스터디 정보
 */
export const getStudyInfo = async (studyId: string) => {
  const studyInfo: Study = await api
    .get(`/studies/${studyId}`)
    .then((res) => res.data);
  return studyInfo;
};

export const getAllStudies = ({ year, semester }: StudySearch) => {
  const params = { year, semester };
  const data = api
    .get('/studies', { params })
    .then((res: AxiosResponse<Study[]>) => res.data);
  return data;
};

export interface MentorApplication
  extends Omit<
    z.infer<typeof ApplyMentorSchema>,
    'study_apply_plans' | 'start_time' | 'end_time'
  > {
  id: number;
  study_apply_plans: { section: string; content: string }[];
  start_time: string;
  end_time: string;
}
export const getAppliedStudies = async () => {
  const data: MentorApplication[] = await authApi
    .get(`/study-apply`)
    .then((res) => res.data);
  return data;
};

export const approveStudies = async (studyIds: number[]) => {
  await authApi.post(`/study-apply/move`, {
    id_list: studyIds,
  });
};
