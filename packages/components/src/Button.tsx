import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';
import MUIButton, { ButtonProps } from '@mui/material/Button';
import MUIIconButton from '@mui/material/IconButton';

export function Button(props: ButtonProps) {
  return <MUIButton {...props} />;
}

export function IconButton(props: ButtonProps) {
  return <MUIIconButton key={props.name} {...props} />;
}

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <Box
      component={'button'}
      position={'fixed'}
      borderRadius={'50%'}
      border={1}
      borderColor={'divider'}
      right={16}
      bottom={16}
      width={64}
      height={64}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        backgroundColor: 'background.default',
        cursor: 'pointer',
      }}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon />
    </Box>
  );
}
