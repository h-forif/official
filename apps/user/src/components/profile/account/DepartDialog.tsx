import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { UserProfile } from '@packages/components/types/user';

import { useChangeDialog } from '@hooks/useChangeDialog';

export function DepartDialog({ user }: { user: UserProfile }) {
  const { setOpen, ChangeDialog } = useChangeDialog({
    user,
    field: 'department',
  });

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
              학과
            </Typography>
            <Typography
              variant='labelLarge'
              fontWeight={400}
              textAlign={'start'}
              flexGrow={1}
              color={'text.primary'}
            >
              {user.department}
            </Typography>
          </Stack>
          <ChevronRightIcon fontSize='large' />
        </Stack>
      </Button>
      <ChangeDialog />
    </>
  );
}
