import { useEffect, useState } from 'react';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/system/Stack';

import LetterIcon from '@assets/logos/forif-letter.svg?react';
import {
  AUTH_NAV_MENUS,
  NAV_MENUS,
  NavMenu,
} from '@constants/nav-menu.constant';
import { Button } from '@packages/components/Button';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { User } from '@packages/components/types/user';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@packages/constants';
import { Link } from '@tanstack/react-router';

import { useMobileNav } from '@hooks/useMobileNav';

import { AppBarProps } from '../../types/app-bar.type';

interface MobileNavProps extends AppBarProps {
  handleSignIn: () => Promise<void>;
  handleSignOut: () => void;
  userState: User['state'];
}

export default function MobileNav({
  handleSignIn,
  handleSignOut,
  mode,
  userState,
  toggleColorMode,
}: MobileNavProps) {
  const { open, toggleDrawer } = useMobileNav();
  const [selectedNavMenus, setSelectedNavMenus] = useState<NavMenu[]>([]);

  useEffect(() => {
    const navMenus = userState === 'sign-out' ? NAV_MENUS : AUTH_NAV_MENUS;
    setSelectedNavMenus(navMenus);
  }, [userState]);

  return (
    <Box sx={{ display: { sm: '', md: 'none' } }}>
      <Button
        variant='text'
        color='primary'
        aria-label='menu'
        onClick={toggleDrawer(true)}
        sx={{ minWidth: '30px', p: '4px' }}
      >
        <MenuIcon />
      </Button>
      <Drawer anchor='right' open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: '100vw',
            p: 2,
            backgroundColor: 'background.paper',
            flexGrow: 1,
          }}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ ml: 1, mb: 4 }}
          >
            <a href='/' style={{ display: 'flex', alignItems: 'center' }}>
              <LetterIcon width={80} height={'100%'} />
            </a>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                gap: 1,
                flexGrow: 1,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Box
                onClick={toggleDrawer(false)}
                sx={{
                  p: 0,
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: 'pointer',
                  width: 24,
                  height: 24,
                }}
              >
                <CloseIcon />
              </Box>
            </Box>
          </Stack>
          <Stack
            direction={'column'}
            divider={<Divider sx={{ ml: 1 }} />}
            gap={1}
            sx={{ mb: 4 }}
          >
            {selectedNavMenus.map((menu) => {
              const isSubMenu = menu.submenu && menu.submenu.length > 0;
              return (
                <Box
                  key={menu.title}
                  onClick={isSubMenu ? () => {} : toggleDrawer(false)}
                >
                  <Accordion
                    disableGutters
                    elevation={0}
                    sx={{
                      '&:before': {
                        display: 'none',
                      },
                      margin: 0,
                      '& .MuiAccordionSummary-root': {
                        padding: 0,
                      },
                      '& .MuiAccordionSummary-content': {
                        margin: 0,
                      },
                      '& .MuiAccordionDetails-root': {
                        paddingX: 0,
                      },
                    }}
                    slotProps={{ transition: { unmountOnExit: true } }}
                  >
                    <Link to={isSubMenu ? undefined : menu.href}>
                      <AccordionSummary
                        expandIcon={
                          isSubMenu ? (
                            <ExpandMoreIcon color='primary' />
                          ) : (
                            <ArrowOutwardIcon color='primary' />
                          )
                        }
                        id={`${menu.title}-header`}
                        aria-controls={`${menu.title}-content`}
                      >
                        <MenuItem sx={{ color: 'text.primary', pl: 1 }}>
                          {menu.title}
                        </MenuItem>
                      </AccordionSummary>
                    </Link>
                    <AccordionDetails>
                      {menu.submenu?.map((submenu) => (
                        <Link
                          key={submenu.title}
                          to={submenu.href}
                          search={
                            submenu.href === '/studies'
                              ? {
                                  year: CURRENT_YEAR,
                                  semester: CURRENT_SEMESTER,
                                }
                              : undefined
                          }
                          onClick={toggleDrawer(false)}
                        >
                          <MenuItem sx={{ color: 'text.primary' }}>
                            {submenu.title}
                          </MenuItem>
                        </Link>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              );
            })}
          </Stack>
          {userState === 'sign-out' ? (
            <Stack direction={'column'} gap={2} sx={{ pl: 1 }}>
              <Button
                variant='contained'
                size='large'
                fullWidth
                onClick={async () => {
                  await handleSignIn();
                  toggleDrawer(false)();
                }}
              >
                Sign up
              </Button>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                onClick={async () => {
                  await handleSignIn();
                  toggleDrawer(false)();
                }}
              >
                Sign in
              </Button>
            </Stack>
          ) : (
            <Stack direction={'column'} gap={2} sx={{ pl: 1 }}>
              <Button
                fullWidth
                variant='outlined'
                size='large'
                onClick={() => {
                  handleSignOut();
                  toggleDrawer(false)();
                }}
              >
                Sign Out
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
