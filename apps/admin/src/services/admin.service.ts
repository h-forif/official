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
  user_id: number;
  name: string;
  primary_study_name: string;
  secondary_study_name?: string;
  phone_number: string;
  intro: string;
  apply_path: string;
}

export interface AllApplication {
  applier_id: number;
  primary_study: number;
  secondary_study: number | null;
  primary_intro: string;
  secondary_intro: null;
  apply_path: string;
  pay_yn: string;
  apply_date: string;
  primary_status: string;
  secondary_status: string | null;
}

export async function getApplications(studyId: StudyId) {
  const applications: MemberApplications = await authApi
    .get(`/applications/${studyId.id}`)
    .then((res) => res.data);
  return applications;
}

export async function getAllApplications() {
  const applications: AllApplication[] = await authApi
    .get(`/applications`)
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
    applier_ids: id,
    apply_status: '승낙',
    study_id: studyId,
  });
}

export async function getMentees(studyId: number) {
  const mentees: User[] = await authApi
    .get(`/studies/${studyId}/users`)
    .then((res) => res.data);
  return mentees;
}
