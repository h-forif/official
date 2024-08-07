import { forwardRef } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

type InputProps = TextFieldProps & {
  search?: boolean;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, error, search, ...props }, ref) => (
    <TextField
      {...props}
      ref={ref}
      error={error}
      helperText={(error && errorMessage) || ''}
      InputProps={{
        startAdornment: search && (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  ),
);
