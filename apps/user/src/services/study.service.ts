// 스터디 정보 관련 API 요청 함수 (예: 스터디 목록 조회, 스터디 상세 정보 등)
import { StudySearch } from '@routes/studies';

import { api } from './axios-instance';

export const getStudyInfo = async (studyId: string) => {
  const response = await api.get(`/study/${studyId}`);
  return response.data;
};

export const getAllStudies = async ({ year, semester }: StudySearch) => {
  const params = { params: { year: year, semester: semester } };
  const response = await api.get('/studies/all', params);
  console.log(response);

  return response.data;
};
