import { useForm } from 'react-hook-form';

import { Stack, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';

import { DEPARTMENT_OPTIONS } from '@constants/department.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { FormAutocomplete } from '@packages/components/form/FormAutocomplete';
import { FormCheckbox } from '@packages/components/form/FormCheckbox';
import { FormInput } from '@packages/components/form/FormInput';
import { User } from '@packages/components/types/user';
import { useAccessToken } from '@store/token.store';
import { getUser } from '@store/user.store';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { SignUpSchema } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export const Route = createFileRoute('/auth/sign-up')({
  loader: () => {
    const user = getUser();
    if (!user.email) {
      window.location.href = '/';
    }
    return user;
  },
  component: SignUpPage,
});

function SignUpPage() {
  const user = Route.useLoaderData();
  const navigate = useNavigate();
  const accessToken = useAccessToken();

  const { email, name, department }: User = user;

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: email ? email : '',
      name: name ? name : '',
      department: department ? department : '',
      id: '',
      phoneNumber: '',
      privacyPolicyAccepted: false,
    },
  });

  const onSubmit = async (formData: z.infer<typeof SignUpSchema>) => {
    console.log(formData);

    // try {
    //   const data = await handleSignUp(formData, accessToken);
    //   setUser(data);
    //   navigate({ to: '/' });
    // } catch (err) {
    //   console.error(err);
    // }
  };
  return (
    <Box component={'main'}>
      <Box
        sx={{
          width: { xs: '100%', md: '512px' },
          px: { xs: 2 },
          pb: 4,
          margin: 'auto',
        }}
      >
        <Title title='회원가입' label='포리프의 13기 부원이 되어주세요.' />
        <Stack
          gap={5}
          justifyContent={'center'}
          alignItems={'center'}
          component={'form'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            control={form.control}
            name='email'
            label='이메일'
            fullWidth
            disabled
            required
          />
          <FormInput
            control={form.control}
            name='name'
            label='이름'
            placeholder='홍길동'
            fullWidth
            required
          />
          <FormAutocomplete
            control={form.control}
            label='학과를 선택해주세요.'
            name='department'
            options={DEPARTMENT_OPTIONS}
            fullWidth
          />
          <FormInput
            control={form.control}
            name='id'
            label='학번'
            placeholder='2024063845'
            fullWidth
            required
          />
          <FormInput
            control={form.control}
            name='phoneNumber'
            label='전화번호'
            placeholder='01012345678'
            fullWidth
            required
          />
          <FormCheckbox
            control={form.control}
            name='privacyPolicyAccepted'
            label={
              <Typography component={'span'}>
                부원 가입을 위한{' '}
                <PrivacyPolicy
                  href='https://hforif.notion.site/bfff20aff823461f92873c2084167e3e?pvs=74'
                  target='_blank'
                >
                  개인정보 수집 및 이용
                </PrivacyPolicy>
                에 동의합니다.
              </Typography>
            }
            required
          />
          <Button variant='contained' type='submit' size='large' fullWidth>
            제출하기
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

const PrivacyPolicy = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '600',
  cursor: 'pointer',
}));
