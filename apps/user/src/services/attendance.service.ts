import { authApi } from './axios-instance';

interface Attendance {
  study_name: string;
  week_num: number;
  attendance_status: '출석' | '결석';
  study_date: string;
}

/**
 * Retrieves the attendance records for a specific user.
 *
 * @param userId - The ID of the user.
 * @returns An array of attendance records.
 */
export async function getAttendance(userId: string | null) {
  const attendances: Attendance[] = await authApi
    .get(`/attendance/users/${userId}`)
    .then((res) => res.data);
  return attendances;
}
