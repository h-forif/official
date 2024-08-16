// 스터디 정보 관련 API 요청 함수 (예: 스터디 목록 조회, 스터디 상세 정보 등)
import { Study } from '@packages/components/types/study';
import { StudySearch } from '@routes/studies';
import { AxiosResponse } from 'axios';

import { api } from './axios-instance';

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

export const deleteStudy = async (studyId: string) => {
  await api.delete(`/studies/${studyId}`);
};
