import { useForm } from 'react-hook-form';

import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/system';
import Stack from '@mui/system/Stack';

import { DEPARTMENT_OPTIONS } from '@constants/department.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { useAccessToken } from '@store/tokenStore';
import { useUserStore } from '@store/userStore';
import { useNavigate } from '@tanstack/react-router';
import { handleSignUp } from 'src/services/auth.service';
import { SignUpSchema, phoneRegex } from 'src/types/sign-up.schema';
import { z } from 'zod';

import { useToast } from '@hooks/useToast';

export function SignUpForm() {
  const { email, name, department } = useUserStore();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: email,
      name: name,
      department: department,
      id: '',
      phoneNumber: '',
      privacyPolicyAccepted: false,
    },
  });

  const { showToast, ToastComponent } = useToast();
  const navigate = useNavigate();
  const accessToken = useAccessToken();

  const onSubmit = async (formData: z.infer<typeof SignUpSchema>) => {
    const { phoneNumber } = formData;

    if (phoneRegex.test(phoneNumber)) {
      formData.phoneNumber = phoneNumber.replace(phoneRegex, '01$1-$2-$3');
    }
    try {
      const data = await handleSignUp(formData, accessToken);
      useUserStore.setState(data);
      navigate({ to: '/' });
    } catch (err) {
      showToast({
        severity: 'error',
        message: '회원가입에 실패했습니다.',
      });
    }
  };

  return (
    <Stack
      gap={5}
      justifyContent={'center'}
      alignItems={'center'}
      component={'form'}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Input
        fullWidth
        label='이메일'
        placeholder='홍길동'
        defaultValue={email}
        disabled
        required
        {...form.register('email')}
        errorMessage={form.formState.errors.email?.message}
      />

      <Input
        required
        fullWidth
        label='이름'
        placeholder='홍길동'
        {...form.register('name')}
        errorMessage={form.formState.errors.name?.message}
      />
      <Autocomplete
        disablePortal
        id='department-combo-box'
        options={DEPARTMENT_OPTIONS}
        fullWidth
        renderInput={(params) => (
          <Input
            {...params}
            required
            label='학과를 선택해주세요.'
            {...form.register('department')}
            errorMessage={form.formState.errors.department?.message}
          />
        )}
      />
      <Input
        required
        fullWidth
        label='학번'
        placeholder='0000063845'
        {...form.register('id')}
        errorMessage={form.formState.errors.id?.message}
      />
      <Input
        required
        fullWidth
        label='전화번호'
        placeholder='010-2078-9868'
        {...form.register('phoneNumber')}
        errorMessage={form.formState.errors.phoneNumber?.message}
      />
      <FormControlLabel
        sx={{ width: '100%' }}
        required
        control={<Checkbox />}
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
        {...form.register('privacyPolicyAccepted')}
      />
      <Button variant='contained' type='submit' size='large' fullWidth>
        제출하기
      </Button>
      {ToastComponent}
    </Stack>
  );
}

const PrivacyPolicy = styled('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '600',
  cursor: 'pointer',
}));
