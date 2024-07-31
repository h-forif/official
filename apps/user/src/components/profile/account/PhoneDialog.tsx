import { ChangeEvent, useState } from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import useToastStore from '@stores/toast.store';
import regex from '@utils/regex';

export interface PhoneDialogProps {
  previousPhoneNumber: string;
}

export function PhoneDialog({ previousPhoneNumber }: PhoneDialogProps) {
  const [open, setOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { showToast } = useToastStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = () => {
    // TO-DO: add change phoneNumber api
    showToast('휴대전화 번호가 변경되었습니다.', 'success');
    setOpen(false);
  };

  return (
    <Box>
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
          <Typography variant='titleMedium' sx={{ mb: 2 }} fontWeight={'bold'}>
            휴대폰
          </Typography>
          <Typography variant='bodySmall' sx={{ mb: 2 }}>
            기입된 전화번호는 알림톡 서비스, 행사 관련 문의 등에 사용됩니다.
          </Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant='labelLarge'>
              {previousPhoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
            </Typography>
            <Button variant='outlined' onClick={() => setOpen(true)}>
              변경
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle mt={2}>변경할 전화번호를 선택해주세요.</DialogTitle>
        <Stack gap={2} px={3} my={3}>
          <Input
            placeholder={previousPhoneNumber}
            value={phoneNumber}
            onChange={handleChange}
            error={!regex.phoneNumber.test(phoneNumber)}
            errorMessage='올바른 휴대전화 양식을 선택해주세요.'
            sx={{ height: 80 }}
          />
          <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
            disabled={!regex.phoneNumber.test(phoneNumber)}
          >
            변경
          </Button>
        </Stack>
      </Dialog>
    </Box>
  );
}
