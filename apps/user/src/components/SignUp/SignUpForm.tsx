import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/system/Stack';

import { DEPARTMENT_OPTIONS } from '@constants/department.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { useUserStore } from '@store/userStore';
import { useNavigate } from '@tanstack/react-router';
import { SignUpSchema, phoneRegex } from 'src/types/sign-up.schema';
import { z } from 'zod';

export function SignUpForm() {
  const { email, id } = useUserStore();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: email,
      name: '',
      department: '',
      id: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (formData: z.infer<typeof SignUpSchema>) => {
    const { phoneNumber } = formData;

    if (phoneRegex.test(phoneNumber)) {
      formData.phoneNumber = phoneNumber.replace(phoneRegex, '01$1-$2-$3');
    }
  };

  useEffect(() => {
    if (id === 0) {
      navigate({ to: '/' });
    }
  }, [id]);
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
      <FormGroup sx={{ width: '100%' }}>
        <Stack alignItems={'flex-start'} width={'100%'}>
          <FormControlLabel
            required
            control={<Checkbox />}
            label='부원 가입을 위한 개인정보 수집 및 이용에 동의합니다.'
          />
        </Stack>
      </FormGroup>
      <Button variant='contained' type='submit' size='large' fullWidth>
        제출하기
      </Button>
    </Stack>
  );
}
