import Markdown from 'react-markdown';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, Divider, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { Layout } from '@packages/components/elements/Layout';
import { getAnnouncement } from '@services/post.service';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import formatMarkdown from '@utils/formatMarkdown';
import rehypeSanitize from 'rehype-sanitize';

import { Title } from '@components/Title';

export const Route = createFileRoute('/announcement/$id')({
  loader: ({ params }) => getAnnouncement(params.id),
  component: AnnounceComponent,
});

function AnnounceComponent() {
  const announcement = Route.useLoaderData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Title
        title='공지사항'
        label='포리프에서 진행하는 모든 행사에 대해 알아보세요.'
      />
      <Layout>
        <Link to='/announcement'>
          <Button variant='outlined'>목록으로 돌아가기</Button>
        </Link>
        <Typography variant='titleLarge' mt={3}>
          {announcement.title}
        </Typography>
        <Typography variant='bodyMedium' color={'text.secondary'}>
          {dayjs(announcement.created_at).format('YYYY-MM-DD(ddd)')}
        </Typography>
        <Typography variant='bodySmall' color={'text.secondary'}>
          작성자: {announcement.created_by}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Markdown
          children={formatMarkdown(announcement.content)}
          rehypePlugins={[rehypeSanitize]}
          className={'markdown'}
        />
      </Layout>
      <Box
        component={'button'}
        position={'fixed'}
        borderRadius={'50%'}
        border={1}
        borderColor={'divider'}
        right={16}
        bottom={16}
        width={64}
        height={64}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          backgroundColor: 'background.default',
          cursor: 'pointer',
        }}
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon />
      </Box>
    </Box>
  );
}
