import { User } from '@packages/components/types/user';

import { authApi } from './axios-instance';
import { MentorApplication } from './study.service';

export async function getAllUsers() {
  const users: User[] = await authApi.get('/users').then((res) => res.data);
  return users;
}

export async function editNotApprovedStudy(
  id: number,
  formData: MentorApplication,
) {
  await authApi.patch(`/study-apply/${id}`, formData);
}
