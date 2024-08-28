import { authApi } from './axios-instance';

export interface PaidUser {
  user_id: number;
  name: string;
  study_id: number;
  study_type: '정규 스터디' | '자율 스터디';
  priority: '1순위' | '2순위';
  phone_number: string;
}

export const getUnpaidUsers = async () => {
  const res: PaidUser[] = await authApi('/applications/unpaid-users').then(
    (res) => res.data,
  );
  return res;
};

export const getPaidUsers = async () => {
  const res: PaidUser[] = await authApi('/applications/paid-users').then(
    (res) => res.data,
  );
  return res;
};

export const changePaidStatus = async (id: number[], status: 'Y' | 'N') => {
  await authApi.patch('/applications/payment-status', {
    applier_ids: id,
    pay_yn: status,
  });
};
