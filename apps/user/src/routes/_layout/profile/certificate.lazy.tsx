import { Box } from '@mui/material';

import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createLazyFileRoute('/_layout/profile/certificate')({
  component: CertificationPage,
});

function CertificationPage() {
  return (
    <Box width={'100%'}>
      <Title
        title='인증서 관리'
        label='인증서를 조회 / 발급 / 다운로드할 수 있습니다.'
        pt={0}
      />
      <Layout>
        <CenteredBox height={480}>
          <Box>현재 개발 중인 기능입니다. 2학기 내로 개발될 예정입니다.</Box>
        </CenteredBox>
      </Layout>
    </Box>
  );
}
