import { Control, FieldValues, Path, useController } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: Array<{ value: string | number; label: string }>;
  minWidth?: number | string;
} & SelectProps;

export function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  options,
  minWidth,
  required,
  ...props
}: FormSelectProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Box sx={{ minWidth: minWidth }}>
      <FormControl fullWidth error={invalid}>
        <InputLabel id={`${name}-select-label`} required={required}>
          {label}
        </InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          label={label}
          {...field}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
