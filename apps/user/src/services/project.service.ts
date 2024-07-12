import { AxiosResponse } from 'axios';
import { Project } from 'src/types/project.type';

import { api } from './axios-instance';

export const getProjects = () => {
  const projects = api
    .get('/products')
    .then((res: AxiosResponse<Project[]>) => res.data);

  return projects;
};
