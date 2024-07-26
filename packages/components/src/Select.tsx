import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MUISelect, {
  BaseSelectProps,
  SelectChangeEvent,
} from '@mui/material/Select';
import { Box } from '@mui/system';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends BaseSelectProps {
  val: string;
  // eslint-disable-next-line no-unused-vars
  setVal: (val: string) => void;
  placeholder: string;
  errorMessage?: string;
  minWidth?: number;
  options: SelectOption[];
}

export function Select({
  val,
  setVal,
  placeholder,
  options,
  minWidth,
  error,
  errorMessage,
  required,
  ...props
}: SelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setVal(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: minWidth }}>
      <FormControl fullWidth error={error}>
        <InputLabel id={`${val}-select-label`} required={required}>
          {placeholder}
        </InputLabel>
        <MUISelect
          labelId={`${val}-select-label`}
          id={`${val}-select`}
          value={val}
          label={placeholder}
          onChange={handleChange}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MUISelect>
        {error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
