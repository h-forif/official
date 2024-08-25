import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { PaletteMode, SvgIconProps } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';

import DarkLetterIcon from '@assets/logos/forif-letter-dark.svg?react';
import LetterIcon from '@assets/logos/forif-letter.svg?react';
import { Link } from '@tanstack/react-router';

export default function Component({ mode }: { mode: PaletteMode }) {
  return (
    <Box
      component='footer'
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        py: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: 8,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: { xs: 8, md: 0 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems='center'
          spacing={4}
        >
          <Link to='/'>
            {' '}
            <Box
              component='span'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {mode === 'light' ? (
                <LetterIcon width={120} height={80} />
              ) : (
                <DarkLetterIcon width={120} height={80} />
              )}
              <Typography component='span' sx={visuallyHidden}>
                FORIF OFFICIAL
              </Typography>
            </Box>
          </Link>
          <Typography variant='bodySmall' color='text.primary'>
            &copy; 2024 FORIF OFFICIAL. All rights reserved.
          </Typography>
        </Stack>

        <Stack
          component='nav'
          direction='row'
          spacing={3}
          sx={{ justifyContent: 'center' }}
        >
          <Link to='/'>
            <Typography
              variant='bodySmall'
              color='text.secondary'
              sx={{ '&:hover': { fontWeight: '700' } }}
            >
              Home
            </Typography>
          </Link>
          <Link to='/club/about'>
            <Typography
              variant='bodySmall'
              color='text.secondary'
              sx={{ '&:hover': { fontWeight: '700' } }}
            >
              About
            </Typography>
          </Link>
          <Link
            to='/studies'
            search={{
              semester: 2,
              year: 2024,
            }}
          >
            <Typography
              variant='bodySmall'
              color='text.secondary'
              sx={{ '&:hover': { fontWeight: '700' } }}
            >
              Studies
            </Typography>
          </Link>
          <Link to='/announcement'>
            <Typography
              variant='bodySmall'
              color='text.secondary'
              sx={{ '&:hover': { fontWeight: '700' } }}
            >
              Announcements
            </Typography>
          </Link>
        </Stack>

        <Stack direction='row' spacing={4} alignItems='center'>
          <Link to='/'>
            <Box
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <ChatBubbleOutlineIcon sx={{ height: 24, width: 24 }} />
              <Typography component='span' sx={visuallyHidden}>
                KaKaoTalk
              </Typography>
            </Box>
          </Link>
          <a href='https://www.instagram.com/forif_hyu/' target='_blank'>
            <Box
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <InstagramIcon sx={{ height: 24, width: 24 }} />
              <Typography component='span' sx={visuallyHidden}>
                Instagram
              </Typography>
            </Box>
          </a>
          <a href='https://www.linkedin.com/groups/14483067/' target='_blank'>
            <Box
              sx={{
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <LinkedinIcon sx={{ height: 24, width: 24 }} />
              <Typography component='span' sx={visuallyHidden}>
                LinkedIn
              </Typography>
            </Box>
          </a>
        </Stack>
      </Box>
    </Box>
  );
}

function InstagramIcon(props: SvgIconProps) {
  return (
    <svg
      {...props}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_49_11)'>
        <path
          d='M12 0C8.7435 0 8.334 0.015 7.0545 0.072C5.775 0.132 4.9035 0.333 4.14 0.63C3.33877 0.930488 2.61321 1.4031 2.0145 2.0145C1.4031 2.61321 0.930488 3.33877 0.63 4.14C0.333 4.902 0.1305 5.775 0.072 7.05C0.015 8.3325 0 8.7405 0 12.0015C0 15.2595 0.015 15.6675 0.072 16.947C0.132 18.225 0.333 19.0965 0.63 19.86C0.9375 20.649 1.347 21.318 2.0145 21.9855C2.6805 22.653 3.3495 23.064 4.1385 23.37C4.9035 23.667 5.7735 23.8695 7.0515 23.928C8.3325 23.985 8.7405 24 12 24C15.2595 24 15.666 23.985 16.947 23.928C18.2235 23.868 19.098 23.667 19.8615 23.37C20.6622 23.0693 21.3872 22.5967 21.9855 21.9855C22.653 21.318 23.0625 20.649 23.37 19.86C23.6655 19.0965 23.868 18.225 23.928 16.947C23.985 15.6675 24 15.2595 24 12C24 8.7405 23.985 8.3325 23.928 7.0515C23.868 5.775 23.6655 4.902 23.37 4.14C23.0695 3.33877 22.5969 2.61321 21.9855 2.0145C21.3868 1.4031 20.6612 0.930488 19.86 0.63C19.095 0.333 18.222 0.1305 16.9455 0.072C15.6645 0.015 15.258 0 11.997 0H12ZM10.9245 2.163H12.0015C15.2055 2.163 15.585 2.1735 16.8495 2.232C18.0195 2.2845 18.6555 2.481 19.0785 2.6445C19.638 2.862 20.0385 3.123 20.4585 3.543C20.8785 3.963 21.138 4.362 21.3555 4.923C21.5205 5.3445 21.7155 5.9805 21.768 7.1505C21.8265 8.415 21.8385 8.7945 21.8385 11.997C21.8385 15.1995 21.8265 15.5805 21.768 16.845C21.7155 18.015 21.519 18.6495 21.3555 19.0725C21.1617 19.5929 20.8549 20.0637 20.457 20.451C20.037 20.871 19.638 21.1305 19.077 21.348C18.657 21.513 18.021 21.708 16.8495 21.762C15.585 21.819 15.2055 21.8325 12.0015 21.8325C8.7975 21.8325 8.4165 21.819 7.152 21.762C5.982 21.708 5.3475 21.513 4.9245 21.348C4.40375 21.1549 3.9324 20.8485 3.5445 20.451C3.14591 20.0634 2.83849 19.592 2.6445 19.071C2.481 18.6495 2.2845 18.0135 2.232 16.8435C2.175 15.579 2.163 15.1995 2.163 11.994C2.163 8.7885 2.175 8.412 2.232 7.1475C2.286 5.9775 2.481 5.3415 2.646 4.9185C2.8635 4.359 3.1245 3.9585 3.5445 3.5385C3.9645 3.1185 4.3635 2.859 4.9245 2.6415C5.3475 2.4765 5.982 2.2815 7.152 2.2275C8.259 2.1765 8.688 2.1615 10.9245 2.16V2.163ZM18.4065 4.155C18.2174 4.155 18.0301 4.19225 17.8554 4.26461C17.6807 4.33698 17.522 4.44305 17.3883 4.57677C17.2545 4.71048 17.1485 4.86923 17.0761 5.04394C17.0037 5.21864 16.9665 5.4059 16.9665 5.595C16.9665 5.7841 17.0037 5.97135 17.0761 6.14606C17.1485 6.32077 17.2545 6.47952 17.3883 6.61323C17.522 6.74695 17.6807 6.85302 17.8554 6.92539C18.0301 6.99775 18.2174 7.035 18.4065 7.035C18.7884 7.035 19.1547 6.88329 19.4247 6.61323C19.6948 6.34318 19.8465 5.97691 19.8465 5.595C19.8465 5.21309 19.6948 4.84682 19.4247 4.57677C19.1547 4.30671 18.7884 4.155 18.4065 4.155ZM12.0015 5.838C11.1841 5.82525 10.3723 5.97523 9.61347 6.27921C8.85459 6.58319 8.16377 7.03511 7.58123 7.60864C6.99868 8.18216 6.53605 8.86585 6.22026 9.61989C5.90448 10.3739 5.74185 11.1833 5.74185 12.0007C5.74185 12.8182 5.90448 13.6276 6.22026 14.3816C6.53605 15.1356 6.99868 15.8193 7.58123 16.3929C8.16377 16.9664 8.85459 17.4183 9.61347 17.7223C10.3723 18.0263 11.1841 18.1763 12.0015 18.1635C13.6193 18.1383 15.1623 17.4779 16.2975 16.3249C17.4326 15.1719 18.0689 13.6188 18.0689 12.0007C18.0689 10.3827 17.4326 8.82962 16.2975 7.67662C15.1623 6.52363 13.6193 5.86324 12.0015 5.838ZM12.0015 7.9995C12.5269 7.9995 13.0471 8.10298 13.5324 8.30402C14.0178 8.50506 14.4588 8.79974 14.8303 9.17122C15.2018 9.5427 15.4964 9.98371 15.6975 10.4691C15.8985 10.9544 16.002 11.4746 16.002 12C16.002 12.5254 15.8985 13.0456 15.6975 13.5309C15.4964 14.0163 15.2018 14.4573 14.8303 14.8288C14.4588 15.2003 14.0178 15.4949 13.5324 15.696C13.0471 15.897 12.5269 16.0005 12.0015 16.0005C10.9405 16.0005 9.92296 15.579 9.17272 14.8288C8.42248 14.0785 8.001 13.061 8.001 12C8.001 10.939 8.42248 9.92146 9.17272 9.17122C9.92296 8.42098 10.9405 7.9995 12.0015 7.9995Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_49_11'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

function LinkedinIcon(props: SvgIconProps) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect width='4' height='12' x='2' y='9' />
      <circle cx='4' cy='4' r='2' />
    </svg>
  );
}
