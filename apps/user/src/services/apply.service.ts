import { Application, ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { authApi } from './axios-instance';

export const applyMember = async (
  application: z.infer<typeof ApplyMemberSchema>,
) => {
  await authApi
    .patch(`/applies`, {
      primary_study: Number(application.primary_study),
      primary_intro: application.primary_intro,
      secondary_study: Number(application.secondary_study),
      secondary_intro: application.secondary_intro,
      apply_path: application.apply_path,
    })
    .then((res) => res.data);
};

export const getApplication = async () => {
  const application: Application = await authApi
    .get('/applies/application')
    .then((res) => res.data);
  return application;
};

export const updateApplication = async (
  application: z.infer<typeof ApplyMemberSchema>,
) => {
  console.log(application.primary_study);

  await authApi
    .patch(`/applies/application`, {
      primary_study: Number(application.primary_study),
      primary_intro: application.primary_intro,
      secondary_study: Number(application.secondary_study),
      secondary_intro: application.secondary_intro,
      apply_path: application.apply_path,
    })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
