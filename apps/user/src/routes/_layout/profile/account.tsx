import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';
import { createFileRoute } from '@tanstack/react-router';
import { getUser } from 'src/services/user.service';

import { Title } from '@components/Title';
import { DepartDialog } from '@components/profile/account/DepartDialog';
import { NameDialog } from '@components/profile/account/NameDialog';
import { PhoneDialog } from '@components/profile/account/PhoneDialog';
import { PictureDialog } from '@components/profile/account/PictureDialog';

export const Route = createFileRoute('/_layout/profile/account')({
  loader: () => getUser(),
  component: ProfileAccount,
});

function ProfileAccount() {
  const user: UserProfile = Route.useLoaderData();

  return (
    <Box width={'100%'}>
      <Title
        title='계정'
        label='정보, 개인 정보 보호 및 보안 설정을 관리하여 나에게 맞는 방식으로 포리프 웹사이트를 사용할 수 있습니다.'
        pt={0}
      />
      <Box
        sx={{ px: { xs: 4, md: 8, xl: 12 }, pb: 4, margin: 'auto' }}
        maxWidth={1120}
      >
        <Grid container spacing={{ xs: 2, md: 4, xl: 6 }}>
          <Grid item xs={12}>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography
                  variant='titleMedium'
                  sx={{ mb: 2 }}
                  fontWeight={'bold'}
                >
                  기본정보
                </Typography>
                <Typography variant='bodyMedium' sx={{ mb: 2 }}>
                  일부 정보가 포리프 웹사이트 서비스를 사용하는 다른 사람에게
                  표시될 수 있습니다.
                </Typography>
                <Stack divider={<Divider />}>
                  <PictureDialog user={user} />
                  <Button
                    sx={{
                      py: 2,
                    }}
                  >
                    <Stack
                      direction={'row'}
                      alignItems={'center'}
                      width={'100%'}
                    >
                      <Stack
                        direction={'row'}
                        alignItems={'center'}
                        flexWrap={'wrap'}
                        width={'100%'}
                      >
                        <Typography
                          variant='labelSmall'
                          sx={{ mr: 3 }}
                          fontWeight={400}
                          width={120}
                          textAlign={'start'}
                          color={'text.primary'}
                        >
                          학번
                        </Typography>
                        <Typography
                          variant='labelLarge'
                          fontWeight={400}
                          textAlign={'start'}
                          flexGrow={1}
                          color={'text.primary'}
                        >
                          {user.id}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Button>
                  <NameDialog user={user} />
                  <DepartDialog user={user} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={12} md={6}>
            <PhoneDialog user={user} />
          </Grid>
          <Grid item sm={12} md={6}>
            <Card
              sx={{
                minWidth: 275,
                backgroundColor: 'background.default',
                borderRadius: 3,
                boxShadow: 0,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <CardContent>
                <Typography
                  variant='titleMedium'
                  sx={{ mb: 2 }}
                  fontWeight={'bold'}
                >
                  알림톡 서비스
                </Typography>
                <Typography variant='bodySmall' sx={{ mb: 2 }}>
                  포리프에서 진행하는 행사, 공지사항 등을 알림톡으로 받아보세요.
                </Typography>
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography
                    component={'a'}
                    href='http://pf.kakao.com/_xiydUG'
                    target='_blank'
                    variant='labelLarge'
                    color={'primary'}
                    fontWeight={700}
                  >
                    포리프 카카오톡 공식 채널
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
