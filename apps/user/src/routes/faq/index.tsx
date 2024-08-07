import { useEffect, useState } from 'react';

import ChatIcon from '@mui/icons-material/Chat';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import { AccordionDetails, Box, Chip, Stack, Typography } from '@mui/material';

import Peeps1 from '@assets/images/avatar/peep-1.svg';
import { Accordion, AccordionSummary } from '@packages/components/Accordion';
import Image from '@packages/components/Image';
import { Input } from '@packages/components/Input';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import { Layout } from '@packages/components/elements/Layout';
import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/faq/')({
  component: FAQPage,
});

//TODO: Replace with actual FAQ content
const faqs = [
  {
    question: '스터디 신청 과정을 자세히 알고 싶어요.',
    answer:
      '스터디 신청은 온라인으로 진행됩니다. 먼저 원하는 스터디를 선택하고, 신청서를 작성한 후 제출하시면 됩니다. 각 스터디는 별도의 모집 요강이 있으니, 확인 후 신청해주세요.',
    tag: '스터디',
  },
  {
    question: '스터디 신청 시 필요한 서류가 있나요?',
    answer:
      '일반적으로 스터디 신청 시 별도의 서류는 필요하지 않습니다. 다만, 일부 스터디에서는 자기소개서나 포트폴리오를 요구할 수 있으니 모집 공고를 확인해주세요.',
    tag: '서류',
  },
  {
    question: '멘토 신청은 어떻게 해야 하나요?',
    answer:
      '로그인 후 상단의 스터디 -> 스터디 개설 버튼을 클릭해주세요. 이후 총 4단계로 이루어진 스터디 정보 작성이 끝나면, 신청 결과가 이메일 및 문자로 전송됩니다.',
    tag: '멘토',
  },
  {
    question: '스터디 신청 후 합격 여부는 어떻게 알 수 있나요?',
    answer:
      '스터디 신청이 완료되면, 각 스터디 별로 정해진 일정에 따라 합격 여부를 이메일로 통보드립니다. 홈페이지에서도 합격 여부를 확인할 수 있습니다.',
    tag: '스터디',
  },
  {
    question: '스터디 활동은 어디에서 이루어지나요?',
    answer:
      '스터디 활동은 주로 온라인으로 진행되며, 필요시 오프라인 모임도 개최됩니다. 온라인 스터디는 Zoom이나 Google Meet을 통해 이루어지며, 오프라인 모임 장소는 추후 공지됩니다.',
    tag: '스터디',
  },
  {
    question: '스터디 신청 후 취소가 가능한가요?',
    answer:
      '스터디 신청 후 취소를 원하실 경우, 스터디 시작일 이전에 관리자에게 연락하여 취소 요청을 할 수 있습니다. 시작일 이후에는 취소가 불가합니다.',
    tag: '취소',
  },
  {
    question: '스터디에 참여하면 어떤 혜택이 있나요?',
    answer:
      '스터디에 참여하면 다양한 네트워킹 기회와 함께 전문적인 지식을 습득할 수 있습니다. 또한, 우수 참여자에게는 수료증이 발급되며, 일부 스터디는 수료 후 추가적인 혜택이 제공됩니다.',
    tag: '혜택',
  },
  {
    question: '스터디 기간은 얼마나 되나요?',
    answer:
      '각 스터디의 기간은 상이하며, 일반적으로 4주에서 12주 사이입니다. 스터디 모집 공고에서 기간을 확인할 수 있으며, 신청 시 기간을 반드시 숙지하시기 바랍니다.',
    tag: '기간',
  },
];

function FAQPage() {
  const [search, setSearch] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  useEffect(() => {
    setFilteredFaqs(
      faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.tag.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search]);

  return (
    <Box component={'main'}>
      <Title
        title='자주 묻는 질문'
        label='자주 묻는 질문 리스트를 검색 및 확인하세요. 각 질문을 클릭하여 답을 확인해보세요.'
      />
      <Layout display={'flex'} flexDirection={'column'} gap={2}>
        <Input
          search
          fullWidth
          placeholder='태그 혹은 질문으로 검색해보세요!'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredFaqs.map((faq, index) => (
          <Accordion key={index} defaultExpanded={index === 0}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                <Typography variant='labelLarge' fontWeight={'300'}>
                  Q. {faq.question}
                </Typography>
                <Chip label={faq.tag} color='primary' variant='outlined' />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='bodyMedium'>A. {faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Layout>
      <CenteredBox
        py={8}
        sx={{
          backgroundColor: 'primary.light',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant='titleLarge' mb={6}>
          아직 질문이 해결되지 않았다면 아래 다양한 채널로 언제든 문의해주세요.
        </Typography>
        <Stack direction='row' justifyContent='space-evenly' width={'100%'}>
          <Image
            src={Peeps1}
            alt='문의사항 캐릭터'
            width={196}
            height={'auto'}
          />
          <Stack
            direction={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            fontSize={52}
            gap={5}
            my={6}
          >
            <a
              href='https://www.instagram.com/forif_hyu/'
              target='_blank'
              style={{ color: 'inherit' }}
            >
              <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
              >
                <InstagramIcon fontSize='inherit' />
                <Typography variant='titleSmall'>
                  포리프 공식 인스타그램
                </Typography>
              </Stack>
            </a>
            <a
              href='http://pf.kakao.com/_xiydUG'
              target='_blank'
              style={{ color: 'inherit' }}
            >
              <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <ChatIcon fontSize='inherit' />
                <Typography variant='titleSmall'>
                  포리프 공식 카카오톡 채널
                </Typography>
              </Stack>
            </a>
            <a
              href='tel:010-2078-9868'
              target='_blank'
              style={{ color: 'inherit' }}
            >
              <Stack
                direction='row'
                justifyContent={'center'}
                alignItems={'center'}
                gap={4}
              >
                <PhoneIcon fontSize='inherit' />
                <Typography variant='titleSmall' textAlign={'center'}>
                  포리프 13기 회장 표준성
                  <br />
                  (010-2078-9868)
                </Typography>
              </Stack>
            </a>
          </Stack>
        </Stack>
      </CenteredBox>
    </Box>
  );
}
