// 스터디 정보 관련 API 요청 함수 (예: 스터디 목록 조회, 스터디 상세 정보 등)
import { Study } from '@packages/components/types/study';
import { StudySearch } from '@routes/studies';
import { AxiosResponse } from 'axios';

import { api } from './axios-instance';

export const getStudyInfo = async (studyId: string) => {
  const response = await api.get(`/study/${studyId}`);
  return response.data;
};

export const getAllStudies = ({ year, semester, level }: StudySearch) => {
  const params = { year, semester, level };
  const data = api
    .get('/studies/all', { params })
    .then((res: AxiosResponse<Study[]>) => res.data);
  return data;
};
