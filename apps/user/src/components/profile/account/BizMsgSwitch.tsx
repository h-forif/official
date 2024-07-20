import { ChangeEvent, useState } from 'react';

import { Switch } from '@mui/material';

export function BizMsgSwitch() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      disabled
    />
  );
}
