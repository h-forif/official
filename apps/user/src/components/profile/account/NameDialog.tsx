import { ChangeEvent, useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/system';

import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import useToastStore from '@stores/toast.store';

export interface NameDialogProps {
  previousName: string;
}

export function NameDialog({ previousName }: NameDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string | null>('');
  const { showToast } = useToastStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    // TO-DO: add change name api
    showToast('이름이 변경되었습니다.', 'success');
    setOpen(false);
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
              이름
            </Typography>
            <Typography
              variant='labelLarge'
              fontWeight={400}
              textAlign={'start'}
              flexGrow={1}
              color={'text.primary'}
            >
              {previousName}
            </Typography>
          </Stack>
          <ChevronRightIcon fontSize='large' />
        </Stack>
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle mt={2}>변경할 이름을 선택해주세요.</DialogTitle>
        <Stack gap={2} px={3} my={3}>
          <Input
            value={name}
            onChange={handleChange}
            placeholder={previousName}
          />
          <Button variant='contained' size='large' onClick={handleSubmit}>
            변경
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}
