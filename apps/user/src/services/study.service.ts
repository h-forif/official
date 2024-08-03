// 스터디 정보 관련 API 요청 함수 (예: 스터디 목록 조회, 스터디 상세 정보 등)
import { Study } from '@packages/components/types/study';
import { StudySearch } from '@routes/studies';
import { AxiosResponse } from 'axios';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { api, authApi } from './axios-instance';

export const getStudyInfo = async (studyId: string) => {
  const response = await api.get(`/studies/${studyId}`);
  return response.data;
};

export const getAllStudies = ({ year, semester }: StudySearch) => {
  const params = { year, semester };
  const data = api
    .get('/studies', { params })
    .then((res: AxiosResponse<Study[]>) => res.data);
  return data;
};

export const applyStudy = async (
  formData: z.infer<typeof ApplyMentorSchema>,
) => {
  const res = await authApi.post(`/study-apply`, formData);
  return res;
};
