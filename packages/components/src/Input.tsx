import { forwardRef } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => <TextField {...props} ref={ref} />,
);
