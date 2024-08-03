import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & TextFieldProps;

export function FormInput<T extends FieldValues>({
  control,
  name,
  ...props
}: FormInputProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <TextField
      {...props}
      {...field}
      error={invalid}
      helperText={error ? error.message : ''}
    />
  );
}
