import { Stack, Typography } from '@mui/material';

import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '@packages/components/Modal';
import { Link } from '@tanstack/react-router';

export default function CautionList() {
  return (
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
        다음과 같은 주의사항이 있습니다. 신청서 수정 전 반드시 확인해주세요.
      </Typography>
      <Stack component={'ol'} gap={1}>
        <Typography component={'li'} variant='bodySmall'>
          스터디는 한 학기에 하나만 신청 가능합니다. 다른 수업을 추가로 듣고
          싶다면{' '}
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
                다양한 스터디를 수강하고 싶나요? 청강 제도를 이용해주세요. 청강
                제도는 다음과 같은 특징이 있습니다.
                <Stack component={'ul'} gap={1}>
                  <li>
                    청강을 하기 위해서는 듣고자하는 스터디 멘토의 사전 허락이
                    필요합니다. 이를 위해 운영진에게 문의해주세요. 문의 방법은
                    아래 두 가지 방법이 있으며, 카카오톡 채널을 통해
                    문의해주신다면 더욱 빠른 답변이 가능합니다.
                  </li>
                  <li>
                    1.{' '}
                    <a
                      href='mailto:contact@forif.org?subject=OOO 스터디 청강 관련 문의?body=안녕하세요, {학번} {학과}{이름}입니다. OOO 스터디를 청강하고 싶습니다.'
                      style={{ color: 'black', fontWeight: 'bold' }}
                    >
                      포리프 공식 메일
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
          스터디 신청 기간은 2024-08-26 ~ 2024-09-11입니다. 이 기간 이후에는{' '}
          <strong>신청서 수정이 불가능합니다.</strong>
        </Typography>
        <Typography component={'li'} variant='bodySmall'>
          <strong>'1순위 스터디 미선정 시 2순위 스터디 미수강'</strong> 옵션에
          체크하신다면 2순위 스터디를 다시 수강하고 싶을 때 2순위 스터디
          지원서를 다시 작성해야 합니다. 1순위 스터디 지원서는 저장됩니다.
        </Typography>
        <Typography component={'li'} variant='bodySmall'>
          모든 정보가 정확한지 다시 한 번 확인해주세요. 이름, 학과, 전화번호를
          수정하고 싶다면{' '}
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
  );
}
