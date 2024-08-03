import { UseFormReturn } from 'react-hook-form';

import { Stack, Typography } from '@mui/material';

import { Input } from '@packages/components/Input';
import { FormCheckbox } from '@packages/components/form/FormCheckbox';
import { FormInput } from '@packages/components/form/FormInput';
import { UserProfile } from '@packages/components/types/user';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function MentorInfo({
  form,
  userInfo,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
  userInfo: UserProfile;
}) {
  const { id, name, department, phone_number } = userInfo;
  return (
    <>
      <Title
        title='신청 부원 정보'
        label='멘토가 두 분이라면 아래 "멘토2"에 함께하는 멘토님의 학번과 이름을 기입해주세요.'
        pt={4}
        mb={0}
      />
      <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
        <Typography variant='titleSmall'>멘토1</Typography>
        <Input required fullWidth label='학번' defaultValue={id} disabled />
        <Input required fullWidth label='이름' defaultValue={name} disabled />
        <Input
          required
          fullWidth
          label='학과'
          defaultValue={department}
          disabled
        />
        <Input
          required
          fullWidth
          label='전화번호'
          defaultValue={phone_number}
          disabled
        />
        <FormCheckbox
          control={form.control}
          label='다른 멘토와 함께 스터디를 개설합니다.'
          name='secondary_mentor'
        />
        {form.watch('secondary_mentor') && (
          <>
            <Typography variant='titleSmall'>멘토2</Typography>
            <FormInput
              fullWidth
              control={form.control}
              name='secondary_mentor_name'
              label='함께하는 멘토의 이름을 입력해주세요.'
              placeholder='홍길동'
            />
            <FormInput
              fullWidth
              control={form.control}
              name='secondary_mentor_id'
              label='함께하는 멘토의 학번을 입력해주세요.'
              placeholder='0000063845'
            />
          </>
        )}
      </Stack>
    </>
  );
}
