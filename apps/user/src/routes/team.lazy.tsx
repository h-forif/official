import { ChangeEvent, useState } from 'react';

import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/system';
import Box from '@mui/system/Box';

import { Input } from '@packages/components/Input';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { createLazyFileRoute } from '@tanstack/react-router';

import Avatar1 from '../assets/images/avatar/peep-73.svg';
import Avatar2 from '../assets/images/avatar/peep-89.svg';
import { type TeamType, team } from '../types/team.enum';

// Mock Data
const mockData = [
  {
    src: Avatar1,
    name: '표준성',
    title: '2024-1 회장',
    desc: '선배, 마라탕후루 사주세요. 싫어!',
    team: '회장단',
    tags: ['리더십', 'PM'],
  },
  {
    src: Avatar2,
    name: '배혜진',
    title: '2024-2 부회장',
    desc: '안녕하세요! 저는 래빗홀 컴퍼니에서 3D Unity Manager를 맡고 있습니다.',
    team: '회장단',
    tags: ['Unity', '3D'],
  },
  {
    src: Avatar1,
    name: '김전략',
    title: '전략기획팀장',
    desc: '전략적 사고로 FORIF를 이끌어갑니다.',
    team: '전략기획팀',
    tags: ['기획', '분석'],
  },
  {
    src: Avatar2,
    name: '이마케팅',
    title: '마케팅팀 팀원',
    desc: '창의적인 마케팅 전략을 수립합니다.',
    team: '마케팅팀',
    tags: ['SNS', '콘텐츠 제작'],
  },
  {
    src: Avatar1,
    name: '박스터디',
    title: '스터디관리팀장',
    desc: '효율적인 스터디 관리를 위해 노력합니다.',
    team: '스터디관리팀',
    tags: ['교육', '멘토링'],
  },
  {
    src: Avatar2,
    name: '최소프트',
    title: 'SW팀 팀원',
    desc: '혁신적인 소프트웨어 개발에 힘씁니다.',
    team: 'SW팀',
    tags: ['React', 'Node.js'],
  },
];

export const Route = createLazyFileRoute('/team')({
  component: TeamPage,
});

function TeamPage() {
  const [selectedTeam, setSelectedTeam] = useState<TeamType>('전체 팀');

  const handleTeamChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSelectedTeam(event.target.value as TeamType);
  };

  const filteredData =
    selectedTeam === '전체 팀'
      ? mockData
      : mockData.filter((item) => item.team === selectedTeam);

  return (
    <Box>
      <CenteredBox
        component={'section'}
        sx={{
          paddingTop: 12,
          paddingX: 6,
          textAlign: 'center',
          margin: 'auto',
          marginBottom: 12,
        }}
      >
        <Typography variant='displayLarge' sx={{ mb: 1 }}>
          FORIF TEAM
        </Typography>
        <Typography variant='labelLarge'>
          영감을 주는 동료와 함께라면, the better life
        </Typography>
      </CenteredBox>
      <Box sx={{ paddingX: { xs: 4, sm: 8, md: 12 }, pb: 4, margin: 'auto' }}>
        <TeamSelect selectedTeam={selectedTeam} onChange={handleTeamChange} />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {filteredData.map((item, index) => (
            <Item
              key={index}
              src={item.src}
              name={item.name}
              title={item.title}
              desc={item.desc}
              team={item.team}
              tags={item.tags}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

interface ItemProps {
  src: string;
  name: string;
  title: string;
  desc: string;
  team: string;
  tags: string[];
}

function Item({ src, name, title, desc, team, tags }: ItemProps) {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
          p: 2,
          textAlign: 'center',
        }}
      >
        <img src={src} width={'60%'} alt={name} />
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ minHeight: '160px', flexGrow: '1' }}
        >
          <Typography variant='titleLarge'>{name}</Typography>
          <Typography variant='labelLarge' sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            flexWrap='wrap'
            justifyContent='center'
            sx={{ mb: 2 }}
          >
            <Chip label={team} size='medium' color='primary' />
            {tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size='medium'
                color={idx === 0 ? 'info' : 'warning'}
              />
            ))}
          </Stack>
          <Typography variant='bodySmall'>{desc}</Typography>
        </Stack>
      </Stack>
    </Grid>
  );
}
interface TeamSelectProps {
  selectedTeam: TeamType;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

function TeamSelect({ selectedTeam, onChange }: TeamSelectProps) {
  return (
    <FormControl sx={{ mb: 4, width: '192px' }}>
      <Input
        id='team-select'
        value={selectedTeam}
        label='팀'
        select
        onChange={onChange}
      >
        {(Object.keys(team) as Array<TeamType>).map((teamName) => (
          <MenuItem key={teamName} value={teamName}>
            {teamName}
          </MenuItem>
        ))}
      </Input>
    </FormControl>
  );
}
