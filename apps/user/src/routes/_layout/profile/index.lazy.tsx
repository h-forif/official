import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';
import {
  ProfileCard,
  ProfileCardDescription,
} from '@components/profile/ProfileCard';

export const Route = createLazyFileRoute('/_layout/profile/')({
  component: Profile,
});

function Profile() {
  return (
    <Box width={'100%'}>
      <Title
        title='프로필'
        label='정보, 개인 정보 보호 및 보안 설정을 관리하여 나에게 맞는 방식으로 Google을 사용할 수 있습니다.'
        pt={0}
      />
      <Box
        sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}
        maxWidth={1120}
      >
        <Grid container spacing={{ xs: 2, md: 4, xl: 6 }}>
          <Grid item sm={6} xs={12}>
            <ProfileCard title='계정 확인 및 변경' href='/profile/account'>
              <ProfileCardDescription>
                <Typography variant='bodyMedium' sx={{ height: 80 }}>
                  개인 정보 및 이를 관리하기 위한 옵션입니다. 프로필 정보를
                  한눈에 확인할 수도 있습니다.
                </Typography>
              </ProfileCardDescription>
            </ProfileCard>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ProfileCard title='내 스터디 확인' href='/profile/account'>
              <ProfileCardDescription>
                <Typography variant='bodyMedium' sx={{ height: 80 }}>
                  내가 현재 수강하는 스터디에 대한 정보를 얻을 수 있습니다.
                </Typography>
              </ProfileCardDescription>
            </ProfileCard>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ProfileCard title='인증서' href='/profile/account'>
              <ProfileCardDescription>
                <Typography variant='bodyMedium' sx={{ height: 80 }}>
                  포리프에서는 한 학기가 끝나면 인증 요건을 충족한 부원에게
                  인증서를 발급합니다.
                </Typography>
              </ProfileCardDescription>
            </ProfileCard>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ProfileCard title='내 스터디 확인' href='/profile/account'>
              <ProfileCardDescription>
                <Typography variant='bodyMedium' sx={{ height: 80 }}>
                  내가 현재 수강하는 스터디에 대한 정보를 얻을 수 있습니다.
                </Typography>
              </ProfileCardDescription>
            </ProfileCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
