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

export interface AlimTalkTemplate {
  templateList: TemplateList[];
  limit: number;
  startKey: string;
}

export interface TemplateList {
  name: string;
  assignType: string;
  accountId: string;
  securityFlag: boolean;
  categoryCode: string;
  isHidden: boolean;
  content: string;
  buttons: Button[];
  messageType: string;
  emphasizeType: string;
  extra: string;
  variables: Variable[];
  templateId: string;
  dateCreated: string;
  dateUpdated: string;
  status: string;
  comments: Comment[];
  channelId: string;
  commentable: boolean;
  code: string;
}

export interface Button {
  buttonType: string;
  buttonName: string;
  linkMo: string;
  linkPc: string;
  linkAnd?: string;
  linkIos?: string;
}

export interface Variable {
  name: string;
}

export interface Comment {
  memberId: string;
  isAdmin: boolean;
  content: string;
  dateCreated: string;
}

export async function getMessageTemplates() {
  const data: AlimTalkTemplate = await authApi
    .get('/alim-talk/templates')
    .then((res) => res.data);
  return data;
}
