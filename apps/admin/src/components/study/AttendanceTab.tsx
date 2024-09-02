import { useState } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { Button } from '@packages/components/Button';
import { User } from '@packages/components/types/user';
import { getWeekOfMonth } from '@utils/time';
import dayjs from 'dayjs';

interface AttendanceTabProps {
  mentees: User[] | undefined;
  isLoading: boolean;
}

export function AttendanceTab({ mentees, isLoading }: AttendanceTabProps) {
  const [checked, setChecked] = useState([0]);
  const [currentDate] = useState(dayjs());

  const handleToggle = (user: number) => () => {
    const currentIndex = checked.indexOf(user);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(user);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Box>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant='titleLarge'>
          {currentDate.format('YYYY-MM-DD')}({getWeekOfMonth(currentDate)}주차)
        </Typography>
        <Button variant='contained'>전원 출석</Button>
      </Stack>
      <Stack direction={'row'} gap={4}>
        {isLoading ? (
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {Array.from(new Array(10)).map((_, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked.indexOf(index) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={`checkbox-list-label-${index}`}
                    primary={`Line item ${index}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {mentees!.map((user) => {
              const labelId = `checkbox-list-label-${user}`;

              return (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <IconButton edge='end' aria-label='comments'>
                      <CheckCircleOutlineOutlinedIcon color='primary' />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(Number(user.id))}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge='start'
                        checked={checked.indexOf(Number(user.id)) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={user.name}
                      secondary={user.id}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </Stack>
    </Box>
  );
}
