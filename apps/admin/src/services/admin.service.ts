import { User } from '@packages/components/types/user';

import { authApi } from './axios-instance';
import { MentorApplication, StudyId } from './study.service';

export async function getAllUsers() {
  const users: User[] = await authApi.get('/users').then((res) => res.data);
  return users;
}

export interface MemberApplications {
  first: Application[];
  second: Application[];
}
export interface Application {
  id: number;
  name: string;
  phone_number: string;
  intro: string;
  apply_path: string;
}

export async function getApplications(studyId: StudyId) {
  const applications: MemberApplications = await authApi
    .get(`/applications?studyId=${studyId.id}`)
    .then((res) => res.data);
  return applications;
}

export async function editNotApprovedStudy(
  id: number,
  formData: MentorApplication,
) {
  await authApi.patch(`/study-apply/${id}`, formData);
}

export async function acceptStudies(id: number[], studyId: number) {
  await authApi.post(`/applications/accept`, {
    applierIds: id,
    applyStatus: '승낙',
    studyId: studyId,
  });
}

export async function getMentees(studyId: number) {
  const mentees: User[] = await authApi
    .get(`/studies/${studyId}/users`)
    .then((res) => res.data);
  return mentees;
}
