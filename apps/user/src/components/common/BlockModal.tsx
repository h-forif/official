import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, Box, Stack, Typography, styled } from '@mui/material';

import { Button } from '@packages/components/Button';

interface BlockModalProps {
  reset: () => void;
  proceed: () => void;
}

export default function BlockModal({ reset, proceed }: BlockModalProps) {
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <Box
        position={'relative'}
        display='flex'
        flexDirection='column'
        bgcolor={'background.default'}
        borderRadius={2}
        p={5}
      >
        <Typography variant='titleMedium' color='inherit'>
          스터디 신청서 작성 중
        </Typography>
        <Typography variant='labelMedium' color='inherit' mb={6}>
          다른 페이지로 이동시에 작성중인 신청서의 내용이 사라질 수 있습니다.
          <br />
          괜찮으시다면 '나가기' 버튼을 눌러주세요.
        </Typography>
        <Stack direction={'row'} alignItems={'center'} gap={2}>
          <Button variant='outlined' onClick={reset}>
            계속 작성하기
          </Button>
          <Button variant='outlined' onClick={proceed} color='error'>
            나가기
          </Button>
        </Stack>
        <Close onClick={reset} />
      </Box>
      기
    </Backdrop>
  );
}

const Close = styled(CloseIcon)({
  position: 'absolute',
  width: '1rem',
  height: '1rem',
  top: '16px',
  right: '16px',
  cursor: 'pointer',
});
