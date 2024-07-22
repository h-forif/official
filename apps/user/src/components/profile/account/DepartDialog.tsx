import { ChangeEvent, useState } from 'react';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Autocomplete, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Stack } from '@mui/system';

import { DEPARTMENT_OPTIONS } from '@constants/department.constant';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import useToastStore from '@store/toast.store';

export interface DepartDialogProps {
  previousDepartment: string;
}

export function DepartDialog({ previousDepartment }: DepartDialogProps) {
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState<string | null>(
    previousDepartment,
  );
  const { showToast } = useToastStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleSubmit = () => {
    // TO-DO: add change department api
    showToast('휴대전화 번호가 변경되었습니다.', 'success');
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
              학과
            </Typography>
            <Typography
              variant='labelLarge'
              fontWeight={400}
              textAlign={'start'}
              flexGrow={1}
              color={'text.primary'}
            >
              {previousDepartment}
            </Typography>
          </Stack>
          <ChevronRightIcon fontSize='large' />
        </Stack>
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open} fullWidth>
        <DialogTitle mt={2}>변경할 학과를 선택해주세요.</DialogTitle>
        <Stack gap={2} px={3} my={3}>
          <Autocomplete
            options={DEPARTMENT_OPTIONS}
            disablePortal
            id='department-combo-box'
            renderInput={(params) => (
              <Input
                {...params}
                required
                label='학과를 선택해주세요.'
                fullWidth
              />
            )}
          />
          <Button variant='contained' size='large' onClick={handleSubmit}>
            변경
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}
