import { GridRowId } from '@mui/x-data-grid';

import { Announcement, FAQ } from '@packages/components/types/post';

import { api, authApi } from './axios-instance';

export async function getAnnouncements() {
  const announcements: Announcement[] = await api
    .get('/posts/announcements')
    .then((res) => res.data);
  return announcements;
}

export async function getAnnouncement(id: GridRowId) {
  const announcement: Announcement = await api
    .get(`/posts/announcements/${id}`)
    .then((res) => res.data);
  return announcement;
}

export async function addAnnouncement(announcement: Announcement) {
  const newAnnouncement: Announcement = await authApi
    .post('/posts/announcements', announcement)
    .then((res) => res.data);
  return newAnnouncement;
}

export async function getFaqs() {
  const faqs: FAQ[] = await api.get('/posts/faqs').then((res) => res.data);
  return faqs;
}

export async function addFaq(faq: FAQ) {
  const newFaq: FAQ = await authApi
    .post('/posts/faqs', {
      tag: faq.tag,
      title: faq.title,
      content: faq.content,
    })
    .then((res) => res.data);
  return newFaq;
}

export async function editFaq(faq: FAQ) {
  const updatedFaq: FAQ = await authApi
    .patch(`/posts/faqs/${faq.id}`, faq)
    .then((res) => res.data);
  return updatedFaq;
}
