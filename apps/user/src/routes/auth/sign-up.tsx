import { Box } from '@mui/system';

import { createFileRoute } from '@tanstack/react-router';
import { useUserStore } from 'src/store/userStore';

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  const { email } = useUserStore();
  return (
    <Box>
      <h1>회원가입 {email}</h1>
    </Box>
  );
}
