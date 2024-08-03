import { Card, CardContent, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';

import { useChangeDialog } from '@hooks/useChangeDialog';

export interface PhoneDialogProps {
  previousPhoneNumber: string;
}

export function PhoneDialog({ user }: { user: UserProfile }) {
  const { setOpen, ChangeDialog } = useChangeDialog({
    user,
    field: 'phone_number',
  });

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
              {user.phone_number!.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
            </Typography>
            <Button variant='outlined' onClick={() => setOpen(true)}>
              변경
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <ChangeDialog />
    </Box>
  );
}
