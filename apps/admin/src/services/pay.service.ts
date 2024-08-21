import { authApi } from './axios-instance';

export interface PaidUser {
  user_id: number;
  name: string;
  primary_study_id: number;
  secondary_study_id: number;
  phone_number: string;
}

export const getUnpaidUsers = async () => {
  const res: PaidUser[] = await authApi('/applications/unpaid-users').then(
    (res) => res.data,
  );
  return res;
};
