import Box from '@mui/system/Box';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';
import { ProjectList } from '@components/hackathon/ProjectList';

export const Route = createLazyFileRoute('/hackathon/')({
  component: HackathonPage,
});

function HackathonPage() {
  return (
    <Box>
      <Title
        title='포리톤'
        label='포리톤은 포리프에서 한 학기가 종료되고 진행되는 해커톤 행사입니다.'
      />
      <ProjectList />
    </Box>
  );
}
