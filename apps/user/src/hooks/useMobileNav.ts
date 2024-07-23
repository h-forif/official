import { useState } from 'react';

export function useMobileNav() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (status: boolean) => () => {
    setOpen(status);
  };

  return { open, toggleDrawer };
}
