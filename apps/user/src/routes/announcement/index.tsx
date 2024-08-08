import { Box, List, ListItemButton, ListItemText } from '@mui/material';

import { Layout } from '@packages/components/elements/Layout';
import { getAnnouncements } from '@services/post.service';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';

import { Title } from '@components/Title';

export const Route = createFileRoute('/announcement/')({
  loader: () => getAnnouncements(),
  component: AnnouncementPage,
});

function AnnouncementPage() {
  const announcements = Route.useLoaderData();
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
                  secondary={dayjs(announcement.created_at).format(
                    'YYYY-MM-DD',
                  )}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Layout>
    </Box>
  );
}
