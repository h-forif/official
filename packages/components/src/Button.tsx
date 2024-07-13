import MUIButton, { ButtonProps } from '@mui/material/Button';
import MUIIconButton from '@mui/material/IconButton';

export function Button(props: ButtonProps) {
  return <MUIButton {...props} />;
}

export function IconButton(props: ButtonProps) {
  return <MUIIconButton key={props.name} {...props} />;
}
