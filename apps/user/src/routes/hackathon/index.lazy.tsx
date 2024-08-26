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
        title='해커톤'
        label='해커톤은 포리프에서 한 학기가 종료되고 진행되는 가장 중요한 행사 중 하나입니다. 부원들은 팀을 이루어 주제를 정하고, 주어진 시간 안에 프로젝트를 완성해야 합니다.'
      />
      <ProjectList />
    </Box>
  );
}
