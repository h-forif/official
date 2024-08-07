import { Box, List, ListItemButton, ListItemText } from '@mui/material';

import { Layout } from '@packages/components/elements/Layout';
import { Link, createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/announcement/')({
  component: AnnouncementPage,
});

const announcements = [
  {
    id: 0,
    title: 'HSPC(Hanyang-Sejong Programming Contest)',
    date: '2024-08-07',
  },
  {
    id: 1,
    title: '2024년 2학기 학사 일정 공지',
    date: '2024-08-15',
  },
  {
    id: 2,
    title: '캠퍼스 대청소 봉사활동 모집',
    date: '2024-08-20',
  },
  {
    id: 3,
    title: '신입생 오리엔테이션 일정 안내',
    date: '2024-09-01',
  },
  {
    id: 4,
    title: '2024년 하계 인턴십 프로그램 모집',
    date: '2024-09-10',
  },
  {
    id: 5,
    title: '학내 동아리 박람회 개최 안내',
    date: '2024-09-18',
  },
  {
    id: 6,
    title: '교내 안전 교육 필수 참석 안내',
    date: '2024-09-25',
  },
  {
    id: 7,
    title: '컴퓨터공학과 졸업 작품 발표회 일정 공지',
    date: '2024-10-05',
  },
  {
    id: 8,
    title: '2024년 겨울 계절학기 수강 신청 안내',
    date: '2024-10-15',
  },
];

function AnnouncementPage() {
  return (
    <Box>
      <Title
        title='공지사항'
        label='포리프에서 진행하는 모든 행사에 대해 알아보세요.'
      />
      <Layout>
        <List
          sx={{
            '& .MuiListItemButton-root': {
              pb: 2,
              color: 'text.primary',
            },
          }}
        >
          {announcements.map((announcement) => (
            <Link key={announcement.id} to={`/announcement/${announcement.id}`}>
              <ListItemButton>
                <ListItemText
                  primary={announcement.title}
                  secondary={announcement.date}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Layout>
    </Box>
  );
}
