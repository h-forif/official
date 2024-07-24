import { ChangeEvent, useRef, useState } from 'react';

import { Dialog, DialogTitle, Stack, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import Image from '@packages/components/Image';

export function PictureDialog({ previousImage }: { previousImage: string }) {
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState<string | ArrayBuffer | null>(
    previousImage,
  );
  // const { showToast } = useToastStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setPicture(null);
  };

  const handleSubmit = () => {
    // TO-DO: add change profile picture api
    // showToast('프로필 사진이 변경되었습니다.', 'success');
    // setOpen(false);
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
            src={previousImage}
            alt='유저 프로필 이미지'
            fallback={previousImage}
            width={56}
            height={56}
            style={{ borderRadius: '100%' }}
          />
        </Stack>
      </Button>
      <Dialog onClose={handleOnClose} open={open}>
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
            src={picture as string}
            alt='유저 프로필 이미지'
            fallback={previousImage}
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
