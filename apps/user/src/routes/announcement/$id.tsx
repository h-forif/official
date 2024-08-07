import Markdown from 'react-markdown';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, Divider, Typography } from '@mui/material';

import { Button } from '@packages/components/Button';
import { Layout } from '@packages/components/elements/Layout';
import { Link, createFileRoute } from '@tanstack/react-router';
import formatMarkdown from '@utils/formatMarkdown';
import rehypeSanitize from 'rehype-sanitize';

import { Title } from '@components/Title';

export const Route = createFileRoute('/announcement/$id')({
  loader: ({ params }) => console.log(params.id),
  component: AnnounceComponent,
});

function AnnounceComponent() {
  //TODO: Replace with actual announcement content
  const explanation = `
  안녕하세요, 포리프 13기 회장 표준성입니다.

한양대학교 세종캠퍼스에서 개최되는 HSPC(Hanyang-Sejong Programming Contest)에 대해 안내드리고자 합니다. 이번 대회는 대학생들의 프로그래밍 역량을 증진시키고, 프로그래밍 대회 문화를 활성화하며, 학생들 간의 교류를 증진시키기 위해 마련되었습니다. 많은 관심과 참여 부탁드립니다.

## 대회 개요

이번 대회는 다음과 같은 목적으로 개최됩니다:

- **프로그래밍 역량 향상**: 대학생들이 자신의 프로그래밍 능력을 테스트하고, 실제 문제 해결 능력을 향상시킬 수 있는 기회를 제공합니다.
- **프로그래밍 대회 문화 활성화**: 프로그래밍 대회에 대한 인식과 참여를 촉진하여, 대회 문화가 활발히 발전할 수 있도록 지원합니다.
- **학생 간 교류 증진**: 프로그래밍에 관심 있는 학생들이 함께 모여 지식을 나누고, 새로운 인맥을 형성할 수 있는 장을 제공합니다.

## 참가 자격

HSPC에 참가할 수 있는 자격은 다음과 같습니다:

- **한양대학교 세종캠퍼스 재학생**: 현재 한양대학교 세종캠퍼스에 재학 중인 학생이라면 누구나 참가 가능합니다.
- **프로그래밍에 관심이 있는 학생**: 프로그래밍 경험이 있거나, 이를 학습 중인 학생 모두 환영합니다. 대회 경험이 없어도 열정이 있는 학생이라면 누구나 참여할 수 있습니다.

## 대회 일정

HSPC 대회는 다음과 같은 일정으로 진행됩니다:

- **참가 신청 기간**: 2024년 8월 7일(수) ~ 8월 15일(목)
  - 참가를 희망하는 학생들은 이 기간 동안 온라인으로 신청서를 제출해주시기 바랍니다.
- **대회 일시**: 2024년 8월 20일(화)
  - 대회는 하루 동안 진행되며, 문제 풀이 및 제출은 대회 당일에 이루어집니다.
- **대회 장소**: 한양대학교 세종캠퍼스
  - 구체적인 대회 장소는 추후 공지될 예정입니다. 참가자들에게는 대회 전날 이메일을 통해 장소와 일정에 대한 자세한 안내를 드립니다.

## 대회 규정 및 시상

- **대회 규정**:
  - 모든 문제는 개별적으로 해결해야 하며, 외부 도움이나 부정행위는 엄격히 금지됩니다.
  - 문제는 알고리즘 및 자료구조와 관련된 다양한 난이도의 문제로 구성되며, 대회 시간 내에 최대한 많은 문제를 해결하는 것이 목표입니다.
- **시상 내역**:
  - 1등: 상장 및 상금 100만원
  - 2등: 상장 및 상금 50만원
  - 3등: 상장 및 상금 30만원
  - 참가자 전원에게는 참가 인증서가 제공됩니다.

## 문의

대회와 관련된 문의는 아래의 연락처를 통해 문의해 주시기 바랍니다. 가능한 한 빨리 답변드리도록 하겠습니다.

- **이메일**: hspc@hanyang.ac.kr
- **전화번호**: 044-860-1234
- **카카오톡 채널**: HSPC (한양대학교 세종캠퍼스)
이번 대회에 많은 참여와 관심 부탁드리며, 여러분의 프로그래밍 실력을 발휘할 수 있는 좋은 기회가 되길 바랍니다. 감사합니다.
  `;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      <Title
        title='공지사항'
        label='포리프에서 진행하는 모든 행사에 대해 알아보세요.'
      />
      <Layout>
        <Link to='/announcement'>
          <Button variant='outlined'>목록으로 돌아가기</Button>
        </Link>
        <Typography variant='titleLarge' mt={3}>
          HSPC(Hanyang-Sejong Programming Contest)
        </Typography>
        <Typography variant='bodyMedium' color={'text.secondary'}>
          2024-08-07
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Markdown
          children={formatMarkdown(explanation)}
          rehypePlugins={[rehypeSanitize]}
          className={'markdown'}
        />
      </Layout>
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
    </Box>
  );
}
