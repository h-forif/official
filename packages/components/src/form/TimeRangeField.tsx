import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { FormControl, FormHelperText, Stack } from '@mui/material';
import {
  LocalizationProvider,
  TimeField,
  TimeFieldProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';

type TimeRangeFieldProps<T extends FieldValues> = {
  control: Control<T>;
  startTime: Path<T>;
  endTime: Path<T>;
} & Omit<TimeFieldProps<Dayjs>, 'name' | 'value' | 'onChange'>;

export function TimeRangeField<T extends FieldValues>({
  control,
  startTime,
  endTime,
  required,
  ...props
}: TimeRangeFieldProps<T>) {
  const { field: startTimeField, fieldState: startTimeFieldState } =
    useController({
      name: startTime,
      control,
      rules: { required },
    });
  const { field: endTimeField, fieldState: endTimeFieldState } = useController({
    name: endTime,
    control,
    rules: { required },
  });

  return (
    <FormControl
      error={startTimeFieldState.invalid || endTimeFieldState.invalid}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
        <Stack direction={'row'} gap={1}>
          <TimeField
            {...props}
            label='시작 시간'
            clearable
            format='HH:mm'
            maxTime={endTimeField.value}
            value={
              startTimeField.value ? dayjs(startTimeField.value, 'HH:mm') : null
            }
            onChange={startTimeField.onChange}
            required={required}
          />
          <TimeField
            {...props}
            label='종료 시간'
            clearable
            format='HH:mm'
            minTime={startTimeField.value}
            value={
              endTimeField.value ? dayjs(endTimeField.value, 'HH:mm') : null
            }
            onChange={endTimeField.onChange}
            required={required}
          />
        </Stack>
        {(startTimeFieldState.error || endTimeFieldState.error) && (
          <FormHelperText>
            {startTimeFieldState.error?.message ||
              endTimeFieldState.error?.message}
          </FormHelperText>
        )}
      </LocalizationProvider>
    </FormControl>
  );
}
