import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/system/Stack';

import { NAV_MENUS } from '@constants/nav-menu';
import { Button } from '@packages/components/Button';
import ToggleColorMode from '@packages/components/ToggleColorMode';
import { Link } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

import { useMobileNav } from '@hooks/useMobileNav';

import { AppBarProps } from '../../types/appBar';

const currentTerm = getCurrentTerm();

export default function MobileNav({ mode, toggleColorMode }: AppBarProps) {
  const { open, toggleDrawer } = useMobileNav();

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
            sx={{ pl: 2, mb: 4 }}
          >
            <a href='/'>
              <Typography
                variant='titleMedium'
                color={'text.primary'}
                fontWeight={700}
              >
                포리프
              </Typography>
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
              <CloseIcon />
            </Box>
          </Stack>
          <Stack
            direction={'column'}
            divider={<Divider sx={{ ml: 1 }} />}
            gap={1}
            sx={{ mb: 4 }}
          >
            {NAV_MENUS.map((menu) => {
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
                    <AccordionDetails>
                      {menu.submenu?.map((submenu) => (
                        <Link
                          key={submenu.title}
                          to={submenu.href}
                          search={
                            submenu.href === '/studies'
                              ? {
                                  year: Number(currentTerm.year),
                                  semester: Number(currentTerm.semester),
                                  level: '전체',
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
          <Stack direction={'column'} gap={2} sx={{ pl: 1 }}>
            <Button
              color='primary'
              variant='contained'
              size='large'
              component='a'
              sx={{ width: '100%' }}
            >
              Sign up
            </Button>
            <Button
              color='primary'
              variant='outlined'
              component='a'
              size='large'
              sx={{ width: '100%' }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
