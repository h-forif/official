import { forwardRef } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputProps = TextFieldProps & {
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, error, ...props }, ref) => (
    <TextField
      {...props}
      ref={ref}
      error={error}
      helperText={(error && errorMessage) || ''}
    />
  ),
);
