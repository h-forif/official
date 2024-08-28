import { authApi } from './axios-instance';

interface MessageBody {
  receivers: string[];
  studyName: string;
  responseSchedule: string;
  dateTime: Date;
  location: string;
  url: string;
}

const REGULAR_STUDY_PASS_TEMPLATE_CODE = 'KA01TP2408241717391498BiBIICCHkD';
const AUTONOMOUS_STUDY_PASS_TEMPLATE_CODE = 'KA01TP240824172242899ekg973cfZlM';
const REGULAR_STUDY_FAIL_TEMPLATE_CODE = 'KA01TP240824172620691rLAdqG6sZPt';
const URGENT_TEMPLATE_CODE = 'KA01TP240826055858319jLZ0e8yiqsN';
const RECRUIT_GOOGLE_FORM_URL = 'forms.gle/DqNMwY9ntGBimdE28';

/**
 * 정규 스터디 합격 문자 보내기
 * @param receivers 수신자
 * @param studyName 스터디 이름
 * @param responseSchedule 응답 기한
 * @param dateTime OT 일시
 * @param location OT 장소
 * @param url 구글 폼 URL
 */
export async function sendPassedRegularStudyMessage({
  receivers,
  studyName,
  responseSchedule,
  dateTime,
  location,
}: MessageBody) {
  await authApi.post('/alim-talk', {
    receivers: receivers,
    templateCode: REGULAR_STUDY_PASS_TEMPLATE_CODE,
    studyName: studyName,
    responseSchedule: responseSchedule,
    dateTime: dateTime,
    location: location,
    url: RECRUIT_GOOGLE_FORM_URL,
  });
}

/**
 * 자율 스터디 합격 문자 보내기
 * @param receivers 수신자
 * @param studyName 스터디 이름
 * @param responseSchedule 응답 기한
 * @param dateTime OT 일시
 * @param location OT 장소
 * @param url 구글 폼 URL
 */
export async function sendPassedAutonomousStudyMessage({
  receivers,
  studyName,
  responseSchedule,
  dateTime,
  location,
}: MessageBody) {
  await authApi.post('/alim-talk', {
    receivers: receivers,
    templateCode: AUTONOMOUS_STUDY_PASS_TEMPLATE_CODE,
    studyName: studyName,
    responseSchedule: responseSchedule,
    dateTime: dateTime,
    location: location,
    url: RECRUIT_GOOGLE_FORM_URL,
  });
}

/**
 * 정규 스터디 불합격 문자 보내기
 * @param receivers 수신자
 * @param studyName 스터디 이름
 * @param responseSchedule 응답 기한
 * @param dateTime OT 일시
 * @param location OT 장소
 * @param url 구글 폼 URL
 */
export async function sendFailedRegularStudyMessage({
  receivers,
  studyName,
  responseSchedule,
  dateTime,
  location,
}: MessageBody) {
  await authApi.post('/alim-talk', {
    receivers: receivers,
    templateCode: REGULAR_STUDY_FAIL_TEMPLATE_CODE,
    studyName: studyName,
    responseSchedule: responseSchedule,
    dateTime: dateTime,
    location: location,
    url: RECRUIT_GOOGLE_FORM_URL,
  });
}

/**
 * 미등록 부원 대상 재촉 문자 보내기
 * @param receivers 수신자
 * @param studyName 스터디 이름
 * @param responseSchedule 응답 기한
 * @param dateTime OT 일시
 * @param location OT 장소
 * @param url 구글 폼 URL
 */
export async function sendUrgentMessage({
  receivers,
  studyName,
  responseSchedule,
  dateTime,
  location,
}: MessageBody) {
  await authApi.post('/alim-talk', {
    receivers: receivers,
    templateCode: URGENT_TEMPLATE_CODE,
    studyName: studyName,
    responseSchedule: responseSchedule,
    dateTime: dateTime,
    location: location,
    url: RECRUIT_GOOGLE_FORM_URL,
  });
}
