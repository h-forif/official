import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';

interface AutocompleteOption {
  label: string;
  id: string;
}

type FormAutocompleteProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  options: AutocompleteOption[];
  label: string;
} & Omit<
  AutocompleteProps<AutocompleteOption, false, false, false>,
  'renderInput'
>;

export function FormAutocomplete<T extends FieldValues>({
  control,
  name,
  options,
  label,
  ...props
}: FormAutocompleteProps<T>) {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <Autocomplete
      {...props}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(event, value) => field.onChange(value ? value.label : '')}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={invalid}
          helperText={error ? error.message : ''}
        />
      )}
    />
  );
}
