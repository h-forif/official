import { useState } from 'react';
import { Path, useForm } from 'react-hook-form';

import { Dialog, DialogTitle, Stack } from '@mui/material';

import { DEPARTMENT_OPTIONS } from '@constants/department.constant';
import { Button } from '@packages/components/Button';
import { FormAutocomplete } from '@packages/components/form/FormAutocomplete';
import { FormInput } from '@packages/components/form/FormInput';
import { UserProfile } from '@packages/components/types/user';
import { UpdateUser, updateUser } from '@services/user.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useRouter } from '@tanstack/react-router';
import { handleGlobalError } from '@utils/handleGlobalError';
import regex from '@utils/regex';

export function useChangeDialog({
  user,
  field,
}: {
  user: UserProfile;
  field: Path<UpdateUser>;
}) {
  const [open, setOpen] = useState(false);
  const { closeDialog, openSingleButtonDialog } = useDialogStore();
  const router = useRouter();

  const form = useForm<UpdateUser>({
    defaultValues: {
      email: user.email!,
      name: user.name!,
      id: user.id!,
      phone_number: user.phone_number!,
      department: user.department!,
      img_url: user.img_url!,
    },
    mode: 'onChange',
  });

  const onSubmit = async () => {
    if (
      field === 'phone_number' &&
      !regex.phone_number.test(form.getValues('phone_number'))
    ) {
      form.setError('phone_number', {
        type: 'manual',
        message: `올바른 형식(예시: ${placeholder[field]})으로 입력해주세요.`,
      });
      return;
    }
    setOpen(false);
    try {
      await updateUser(form.getValues());
      router.invalidate();
      openSingleButtonDialog({
        mainButtonText: '확인',
        title: `부원 ${translate[field]} 변경`,
        message: `${translate[field]}이(가) 변경되었습니다.`,
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonAction: () => closeDialog(),
      });
    } catch (err) {
      handleGlobalError(err);
    }
  };
  const ChangeDialog = () => {
    return (
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
        <DialogTitle mt={2}>
          변경할 {translate[field]}을(를) 입력해주세요.
        </DialogTitle>
        <Stack
          gap={2}
          px={3}
          my={3}
          component={'form'}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {field === 'department' ? (
            <FormAutocomplete
              control={form.control}
              label='학과를 선택해주세요.'
              name='department'
              options={DEPARTMENT_OPTIONS}
              fullWidth
            />
          ) : (
            <FormInput
              control={form.control}
              name={field}
              placeholder={placeholder[field]}
            />
          )}

          <Button type='submit' variant='contained' size='large'>
            변경
          </Button>
        </Stack>
      </Dialog>
    );
  };

  return { onSubmit, open, setOpen, form, ChangeDialog };
}

const translate: Record<Path<UpdateUser>, string> = {
  phone_number: '전화번호',
  department: '학과',
  name: '이름',
  email: '이메일',
  id: '학번',
  img_url: '프로필 사진',
};

const placeholder: Record<Path<UpdateUser>, string> = {
  phone_number: '01012341234',
  department: '',
  name: '홍길동',
  email: 'standardstar@hanyang.ac.kr',
  id: '2022063845',
  img_url: '',
};
