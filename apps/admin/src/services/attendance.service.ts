import { authApi } from './axios-instance';

interface Attendance {
  mentee_name: string;
  mentee_department: string;
  mentee_phone_number: string;
  week_num: number;
  attendance_status: '출석' | '결석';
  study_date: string;
}

interface AttendProps {
  studyId: number;
  userId: number;
  weekNum: number;
  attendanceStatus: '출석' | '결석';
}

export async function getAttendance(studyId: number) {
  const attendances: Attendance[] = await authApi
    .get(`/attendance/studies/${studyId}`)
    .then((res) => res.data);
  return attendances;
}

export async function Attend({
  attendanceStatus,
  studyId,
  userId,
  weekNum,
}: AttendProps) {
  await authApi.post(`/attendance`, {
    attendanceStatus,
    studyId,
    userId,
    weekNum,
  });
}
