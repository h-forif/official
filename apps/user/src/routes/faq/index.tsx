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
import { getFaqs } from '@services/post.service';
import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/faq/')({
  loader: () => getFaqs(),
  component: FAQPage,
});

function FAQPage() {
  const faqs = Route.useLoaderData();
  const [search, setSearch] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  useEffect(() => {
    setFilteredFaqs(
      faqs.filter(
        (faq) =>
          faq.title.toLowerCase().includes(search.toLowerCase()) ||
          faq.tag.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, faqs]);

  return (
    <Box>
      <Title
        title='자주 묻는 질문'
        label='자주 묻는 질문 리스트를 검색 및 확인하세요. 각 질문을 클릭하여 답을 확인해보세요.'
      />
      <Layout display={'flex'} flexDirection={'column'} gap={2} minHeight={320}>
        <Input
          search
          fullWidth
          placeholder='태그 혹은 질문으로 검색해보세요!'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filteredFaqs.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`panel-${index}-content`}
              id={`panel-${index}-header`}
            >
              <Stack direction={'row'} alignItems={'center'} gap={1.5}>
                <Typography variant='labelLarge' fontWeight={'300'}>
                  Q. {faq.title}
                </Typography>
                <Chip label={faq.tag} color='primary' variant='outlined' />
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='bodyMedium'>A. {faq.content}</Typography>
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
        <Typography variant='titleLarge' mb={6} px={{ xs: 4 }}>
          아직 질문이 해결되지 않았다면 아래 다양한 채널로 언제든 문의해주세요.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-around' }}
          alignItems={'center'}
          width={'100%'}
        >
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
