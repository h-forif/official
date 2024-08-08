export interface Post {
  id: number;
  created_at: Date;
  title: string;
  content?: string;
}

export interface Announcement extends Post {
  created_by: string;
  type: '공지사항';
}

export interface FAQ extends Post {
  tag: string;
  type: 'FAQ';
}
