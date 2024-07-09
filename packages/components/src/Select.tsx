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
  minWidth?: number;
  options: SelectOption[];
}

export function Select({
  val,
  setVal,
  placeholder,
  options,
  minWidth = 120,
  ...props
}: SelectProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setVal(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: minWidth }}>
      <FormControl fullWidth>
        <InputLabel id={`${val}-select-label`}>{placeholder}</InputLabel>
        <MUISelect
          labelId={`${val}-select-label`}
          id={`${val}-select`}
          displayEmpty
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
      </FormControl>
    </Box>
  );
}
