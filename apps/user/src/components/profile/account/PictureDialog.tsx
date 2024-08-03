import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, DialogTitle, Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';
import { UserProfile } from '@packages/components/types/user';
import { UpdateUser, updateUser } from '@services/user.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { handleGlobalError } from '@utils/handleGlobalError';

export function PictureDialog({ user }: { user: UserProfile }) {
  const [open, setOpen] = useState(false);
  const { closeDialog, openSingleButtonDialog } = useDialogStore();

  const form = useForm<UpdateUser>({
    defaultValues: {
      email: user.email!,
      name: user.name!,
      id: user.id!,
      phone_number: user.phone_number!,
      department: user.department!,
      img_url: user.img_url!,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue('img_url', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setOpen(false);
    try {
      await updateUser(form.getValues());
      openSingleButtonDialog({
        mainButtonText: '확인',
        title: '학과 변경',
        message: '학과가 변경되었습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonAction: () => closeDialog(),
      });
    } catch (err) {
      handleGlobalError(err);
    }
  };

  return (
    <>
      <Button
        variant='text'
        sx={{
          justifyContent: 'flex-start',
          py: 2,
          borderRadius: 2,
        }}
        onClick={() => setOpen(true)}
      >
        <Stack direction={'row'} alignItems={'center'} width={'100%'}>
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
              프로필 사진
            </Typography>
            <Typography
              variant='labelSmall'
              fontWeight={400}
              textAlign={'start'}
              flexGrow={1}
              color={'text.secondary'}
            >
              기본 프로필 사진은 구글 계정의 사진입니다.
            </Typography>
          </Stack>

          <Image
            src={user.img_url!}
            alt='유저 프로필 이미지'
            width={56}
            height={56}
            style={{ borderRadius: '100%' }}
          />
        </Stack>
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
        <DialogTitle mt={2} textAlign={'center'}>
          변경할 프로필 사진을 선택해주세요.
        </DialogTitle>
        <Stack gap={2} px={3} my={3} width={'100%'} alignItems={'center'}>
          <input
            accept='image/*'
            style={{ display: 'none' }}
            ref={fileInputRef}
            type='file'
            onChange={handleImageUpload}
          />
          <Image
            src={form.getValues('img_url')}
            alt='유저 프로필 이미지'
            width={120}
            height={120}
            style={{
              borderRadius: '100%',
              marginBottom: 24,
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current?.click()}
          />

          <Button
            variant='contained'
            size='large'
            fullWidth
            disabled
            onClick={handleSubmit}
          >
            후에 추가될 기능입니다!
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}
