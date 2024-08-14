import { Box } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/common/Title';

export const Route = createFileRoute('/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <Box width={'100%'}>
      <Title
        title='Dashboard'
        label='항상 포리프를 위해 활동해주셔서 감사드려요.'
      />
    </Box>
  );
}
