import { Box } from '@mui/system';

import { createFileRoute } from '@tanstack/react-router';

import { SignUpForm } from '@components/SignUp/SignUpForm';
import { Title } from '@components/Title';

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <Box component={'main'} sx={{ mx: '4vw' }}>
      <Box sx={{ maxWidth: '512px', mx: 'auto', mb: 8 }}>
        <Title title='회원가입' label='포리프의 13기 부원이 되어주세요.' />
        <SignUpForm />
      </Box>
    </Box>
  );
}
