import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { Box, Divider, Typography } from '@mui/material';

import { Button, ScrollToTopButton } from '@packages/components/Button';
import { Layout } from '@packages/components/elements/Layout';
import { getAnnouncement } from '@services/post.service';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from '@utils/dayjs';
import formatMarkdown from '@utils/formatMarkdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

import { Title } from '@components/Title';

export const Route = createFileRoute('/announcement/$id')({
  loader: ({ params }) => getAnnouncement(params.id),
  component: AnnounceComponent,
});

function AnnounceComponent() {
  const announcement = Route.useLoaderData();

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
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  PreTag={'div'}
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Layout>
      <ScrollToTopButton />
    </Box>
  );
}
