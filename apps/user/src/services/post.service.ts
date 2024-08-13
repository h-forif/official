import { Announcement, FAQ } from '@packages/components/types/post';

import { api } from './axios-instance';

export const getAnnouncements = async () => {
  const data: Announcement[] = await api
    .get('/posts/announcements')
    .then((res) => res.data);
  return data;
};

export const getAnnouncement = async (id: string) => {
  const data: Announcement = await api
    .get(`/posts/announcements/${id}`)
    .then((res) => res.data);
  return data;
};

export const getFaqs = async () => {
  const data: FAQ[] = await api.get('/posts/faqs').then((res) => res.data);
  return data;
};
