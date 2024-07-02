import MUIButton from '@mui/material/Button';
import MUIIconButton from '@mui/material/IconButton';

import { ButtonProps } from '@components/types/button';

export function Button(props: ButtonProps) {
  return <MUIButton key={props.name} {...props} />;
}

export function IconButton(props: ButtonProps) {
  return <MUIIconButton key={props.name} {...props} />;
}
