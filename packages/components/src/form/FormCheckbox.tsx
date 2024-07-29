import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
} & CheckboxProps;

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormCheckboxProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <FormControlLabel
      control={
        <Checkbox
          {...props}
          onChange={onChange}
          onBlur={onBlur}
          checked={value}
          name={name}
          inputRef={ref}
        />
      }
      label={label}
      sx={{
        width: '100%',
      }}
    />
  );
}
