import { Dayjs } from 'dayjs';

import { authApi } from './axios-instance';

export interface MessageBody {
  receivers: string[];
  studyName?: string;
  responseSchedule: Dayjs;
  dateTime: Dayjs;
  location: string;
  url: string;
  templateCode: string;
}

/**
 * 정규 스터디 합격 문자 보내기
 * @param receivers 수신자
 * @param studyName 스터디 이름
 * @param responseSchedule 응답 기한
 * @param dateTime OT 일시
 * @param location OT 장소
 * @param url 구글 폼 URL
 */
export async function sendMessage({
  receivers,
  studyName,
  responseSchedule,
  dateTime,
  location,
  url,
  templateCode,
}: MessageBody) {
  // 자율스터디 합격 혹은 정규 스터디 불합격
  if (studyName === undefined) {
    await authApi.post('/alim-talk', {
      receivers: receivers,
      templateCode: templateCode,
      responseSchedule: responseSchedule.format('YYYY-MM-DD HH:mm'),
      dateTime: dateTime.format('YYYY-MM-DD HH:mm'),
      location: location,
      url: url,
    });
  } else {
    await authApi.post('/alim-talk', {
      receivers: receivers,
      templateCode: templateCode,
      studyName: studyName,
      responseSchedule: responseSchedule.format('YYYY-MM-DD HH:mm'),
      dateTime: dateTime.format('YYYY-MM-DD HH:mm'),
      location: location,
      url: url,
    });
  }
}
