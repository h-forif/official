import {
  Backdrop,
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';

import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@packages/components/Modal';
import { Link, createFileRoute, useBlocker } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/apply/member')({
  component: ApplyMember,
});

function ApplyMember() {
  const { proceed, reset, status } = useBlocker({
    condition: true,
  });

  return (
    <>
      <Box component={'main'} sx={{ mx: '3vw' }}>
        <Box sx={{ maxWidth: '512px', mx: 'auto', mb: 8 }}>
          <Title title='스터디 신청' label='2024-08-26 ~ 2024-09-11' mb={3} />
          <Stack
            sx={{
              p: 2,
              my: 4,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant='labelMedium' color={'error'} mt={1}>
              다음과 같은 주의사항이 있습니다. 스터디 신청 전 반드시
              확인해주세요.
            </Typography>
            <Stack component={'ol'} gap={1}>
              <Typography component={'li'} variant='bodySmall'>
                포리프 부원으로써 다양한 행사 및 혜택에 참여하고 싶다면{' '}
                <Modal>
                  <ModalTrigger>
                    <Typography
                      variant='bodySmall'
                      component={'span'}
                      fontWeight={'bold'}
                      sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      자율 스터디
                    </Typography>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>자율 스터디란?</ModalTitle>
                    </ModalHeader>
                    <ModalDescription>
                      포리프에는 두 가지 유형의 스터디가 있습니다. 자율 스터디와
                      정규 스터디입니다. 자율 스터디는 다음과 같은 특징이
                      있습니다.
                      <Stack component={'ul'} gap={1}>
                        <li>
                          특정 정규 스터디에 소속되어 활동하지 않고, 학기 중에
                          개설되는 자율스터디를 수강할 수 있습니다.
                        </li>
                        <li>
                          포리프의 행사 및 혜택에 모두 참여할 수 있습니다.
                        </li>
                        <li>
                          자율스터디 수강은 <strong>포리프 인증서</strong>가
                          발급되지 않습니다.
                        </li>
                        <li>
                          자율스터디는 출석체크 대상에 포함되지 않습니다. 또한,
                          정해진 수업 회차나 일정이 없습니다.
                        </li>
                        <li>
                          자율 스터디 부원은 정규 스터디 부원의 회비보다 5000원
                          감면된 회비를 내야합니다.
                        </li>
                      </Stack>
                    </ModalDescription>
                  </ModalContent>
                </Modal>
                와 정규스터디 중 하나를 반드시 수강해야합니다.
              </Typography>
              <Typography component={'li'} variant='bodySmall'>
                스터디는 한 학기에 하나만 신청 가능합니다. 다른 수업을 추가로
                듣고 싶다면{' '}
                <Modal>
                  <ModalTrigger>
                    <Typography
                      variant='bodySmall'
                      component={'span'}
                      fontWeight={'bold'}
                      sx={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      청강 제도
                    </Typography>
                  </ModalTrigger>
                  <ModalContent>
                    <ModalHeader>
                      <ModalTitle>청강 제도란?</ModalTitle>
                    </ModalHeader>
                    <ModalDescription>
                      다양한 스터디를 수강하고 싶나요? 청강 제도를 이용해주세요.
                      청강 제도는 다음과 같은 특징이 있습니다.
                      <Stack component={'ul'} gap={1}>
                        <li>
                          청강을 하기 위해서는 듣고자하는 스터디 멘토의 사전
                          허락이 필요합니다. 이를 위해 운영진에게 문의해주세요.
                          문의 방법은 아래 두 가지 방법이 있으며, 카카오톡
                          채널을 통해 문의해주신다면 더욱 빠른 답변이
                          가능합니다.
                        </li>
                        <li>
                          <a
                            href='mailto:contact@forif.org?subject=OOO 스터디 청강 관련 문의?body=안녕하세요, {학번} {학과}{이름}입니다. OOO 스터디를 청강하고 싶습니다.'
                            style={{ color: 'black', fontWeight: 'bold' }}
                          >
                            1. 포리프 공식 메일
                          </a>
                          (contact@forif.org)을 사용해 문의하기
                        </li>
                        <li>
                          2.{' '}
                          <a
                            href='https://pf.kakao.com/_xiydUG'
                            target='_blank'
                            style={{ color: 'orange', fontWeight: 'bold' }}
                          >
                            카카오톡 채널
                          </a>
                          을 사용해 문의하기
                        </li>
                        <li>
                          <strong>포리프 인증서</strong>가 발급되지 않습니다.
                        </li>
                        <li>출석체크 대상에 포함되지 않습니다.</li>
                      </Stack>
                    </ModalDescription>
                  </ModalContent>
                </Modal>
                를 이용해주세요.
              </Typography>
              <Typography component={'li'} variant='bodySmall'>
                스터디 신청 기간은 2024-08-26 ~ 2024-09-11입니다. 이 기간
                이후에는 <strong>신청서 수정이 불가능합니다.</strong>
              </Typography>
              <Typography component={'li'} variant='bodySmall'>
                어떤 스터디를 들을 지 마음이 정해지지 않았다면, 포리프의 스터디
                추천 서비스를 이용해보세요.
              </Typography>
              <Typography component={'li'} variant='bodySmall'>
                모든 정보가 정확한지 다시 한 번 확인해주세요. 이메일, 이름,
                학번, 전화번호 네 가지 정보를 수정하고 싶다면,{' '}
                <Link
                  to='/profile/account'
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  프로필 페이지
                </Link>
                에서 수정해주세요.
              </Typography>
            </Stack>
          </Stack>
          <Stack
            gap={5}
            justifyContent={'center'}
            alignItems={'center'}
            component={'form'}
          >
            <Input
              fullWidth
              label='이메일'
              placeholder='홍길동'
              disabled
              required
            />

            <Input required fullWidth label='이름' placeholder='홍길동' />
            <Input required fullWidth label='학번' placeholder='0000063845' />
            <Input
              required
              fullWidth
              label='전화번호'
              placeholder='010-2078-9868'
            />
            <FormControlLabel
              sx={{ width: '100%' }}
              required
              control={<Checkbox />}
              label={
                <Typography component={'span'}>
                  부원 가입을 위한 개인정보 수집 및 이용에 동의합니다.
                </Typography>
              }
            />
            <Button variant='contained' type='submit' size='large' fullWidth>
              제출하기
            </Button>
          </Stack>
        </Box>
      </Box>
      {status === 'blocked' && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <Box
            display='flex'
            flexDirection='column'
            gap={2}
            bgcolor={'background.default'}
            borderRadius={2}
            p={6}
          >
            <Typography variant='titleMedium' color='inherit'>
              스터디 신청서 작성 중
            </Typography>
            <Typography variant='labelMedium' color='inherit'>
              작성 중인 신청서가 있습니다. 나가시겠습니까?
            </Typography>
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Button variant='outlined' onClick={reset}>
                계속 작성하기
              </Button>
              <Button variant='outlined' onClick={proceed} color='error'>
                나가기
              </Button>
            </Stack>
          </Box>
          기
        </Backdrop>
      )}
    </>
  );
}
