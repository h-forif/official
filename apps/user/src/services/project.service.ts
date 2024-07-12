import { AxiosResponse } from 'axios';
import { Project } from 'src/types/project.type';

import { api } from './axios-instance';

export const getProjects = () => {
  const data = api
    .get('/projects')
    .then((res: AxiosResponse<Project[]>) => res.data);
  return data;
};
