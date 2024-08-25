import { useState } from 'react';

import { Chip, Grid, Skeleton, Stack, Typography } from '@mui/material';

import Image from '@packages/components/Image';
import { Team } from '@packages/components/types/user';
import { TeamSearch } from '@routes/club/team';
import { getTeam } from '@services/user.service';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';

import useDeviceSize from '@hooks/useDeviceSize';

export function TeamList({ year, semester }: TeamSearch) {
  const {
    data: teamData,
    isLoading,
    error,
  } = useQuery<Team[], AxiosError>({
    queryKey: ['studies', year, semester],
    queryFn: () => getTeam({ year, semester }),
    retry: false,
  });

  if (isLoading) {
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {Array.from({ length: 7 }, (_, index) => index + 1).map((item) => (
          <Grid key={item} item xl={3} md={4} sm={6} xs={12}>
            <Skeleton variant='rounded' width={'100%'} height={360} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    console.error(error);
  }

  const sortedTeamData = teamData?.sort((a, b) => {
    const titlePriority = (title: string) => {
      switch (title) {
        case '회장':
          return 1;
        case '부회장':
          return 2;
        case '팀장':
          return 3;
        default:
          return 4;
      }
    };

    return titlePriority(a.user_title) - titlePriority(b.user_title);
  });

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 1, sm: 8, md: 12 }}
    >
      {sortedTeamData?.map((team) => <TeamItem key={team.user.id} {...team} />)}
    </Grid>
  );
}

function TeamItem({
  user,
  prof_img_url,
  self_intro,
  user_title,
  intro_tag,
  club_department,
  act_semester,
  act_year,
}: Team) {
  const [isActive, setIsActive] = useState(false);
  const { isMobile } = useDeviceSize();

  const handleInteraction = () => {
    if (isMobile) {
      setIsActive(!isActive);
    }
  };

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
          position: 'relative',
          overflow: 'hidden',
          cursor: isMobile ? 'pointer' : 'default',
        }}
        onClick={handleInteraction}
      >
        <Image
          src={prof_img_url!}
          width={'60%'}
          alt={`profile picture of ${user.name}`}
        />
        <Stack
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ minHeight: '160px', flexGrow: '1' }}
        >
          <Typography variant='titleLarge'>{user.name}</Typography>
          <Typography variant='labelLarge' sx={{ mb: 1 }}>
            {club_department}
          </Typography>
          <Stack
            direction='row'
            spacing={1}
            flexWrap='wrap'
            justifyContent='center'
            sx={{ mb: 2 }}
          >
            {user_title && (
              <Chip label={user_title} size='medium' color='primary' />
            )}
            {intro_tag && <Chip label={intro_tag} size='medium' color='info' />}
          </Stack>
          <Typography variant='bodySmall'>{self_intro}</Typography>
        </Stack>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          whileHover={{ opacity: isMobile ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant='titleLarge' color='white'>
            {act_year}-{act_semester} {club_department} {user_title}
          </Typography>
        </motion.div>
      </Stack>
    </Grid>
  );
}
