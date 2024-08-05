import { useEffect, useState } from 'react';

import { Box, CardContent, Divider, Typography, styled } from '@mui/material';

import Peeps1 from '@assets/images/avatar/peep-1.svg?react';
import Peeps2 from '@assets/images/avatar/peep-2.svg?react';
import Peeps3 from '@assets/images/avatar/peep-58.svg?react';
import Peeps4 from '@assets/images/avatar/peep-75.svg?react';
import { REVIEW_END_DATE, REVIEW_START_DATE } from '@constants/apply.constant';
import { CenteredBox } from '@packages/components/elements/CenteredBox';
import dayjs from 'dayjs';
import { Application } from 'src/types/apply.schema';

import ApplyMentorStepper from '@components/apply/mentor/ApplyMentorStepper';

import useInterval from '@hooks/useInterval';

const steps = ['지원서 작성 중', '제출 완료', '검토 중', '합격 여부'];

export function ApplicationState({
  application,
}: {
  application: Application;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    if (application) {
      if (
        application.primary_study.status === '대기' ||
        application.secondary_study.status === '대기'
      )
        setActiveStep(1);
      if (currentDate.isAfter(dayjs(REVIEW_START_DATE))) setActiveStep(2);
      if (currentDate.isAfter(dayjs(REVIEW_END_DATE))) setActiveStep(3);
    } else {
      setActiveStep(0);
    }
  }, [application, currentDate]);

  useInterval(() => {
    setCurrentDate(dayjs());
  }, 1000);

  function ApplicationStateContents() {
    switch (activeStep) {
      case 0:
        return (
          <CenteredBox flexDirection={'column'}>
            <Peeps1 width={'100%'} height={'280px'} />
            <Typography variant='titleSmall' mt={2} textAlign={'center'}>
              현재 지원서 작성 중입니다.
            </Typography>
          </CenteredBox>
        );
      case 1:
        return (
          <CenteredBox flexDirection={'column'}>
            <Peeps2 width={'100%'} height={'280px'} />
            <Typography variant='bodySmall' mt={2} textAlign={'center'}>
              현재 지원서가 제출 완료된 상태입니다. 수정할 수 있습니다.
            </Typography>
          </CenteredBox>
        );
      case 2:
        return (
          <CenteredBox flexDirection={'column'}>
            <Peeps3 width={'100%'} height={'280px'} />
            <Typography variant='bodySmall' mt={2} textAlign={'center'}>
              현재 지원서가 멘토에 의해 검토 중인 상태입니다. 지원서 수정이
              불가능합니다.
            </Typography>
          </CenteredBox>
        );
      case 3:
        return (
          <CenteredBox flexDirection={'column'}>
            <Peeps4 width={'100%'} height={'280px'} />
          </CenteredBox>
        );
    }
  }

  return (
    <Box
      sx={{
        minWidth: 275,
        height: 512,
        backgroundColor: 'background.default',
        borderRadius: 3,
        boxShadow: 0,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent>
        <ApplyMentorStepper steps={steps} activeStep={activeStep} />
        <StepContent>
          <Box>
            <Typography variant='titleMedium' textAlign={'center'}>
              1순위 스터디
            </Typography>
            <Box>
              <ApplicationStateContents />
              {activeStep === 3 && (
                <Typography variant='bodySmall' mt={2} textAlign={'center'}>
                  스터디 지원 결과:{' '}
                  {application.primary_study.status === '승낙'
                    ? '합격'
                    : '불합격'}
                </Typography>
              )}
            </Box>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Box>
            <Typography variant='titleMedium' textAlign={'center'}>
              2순위 스터디
            </Typography>
            <Box>
              <ApplicationStateContents />
              {activeStep === 3 && (
                <Typography variant='bodySmall' mt={2} textAlign={'center'}>
                  스터디 지원 결과:{' '}
                  {application.secondary_study.status === '승낙'
                    ? '합격'
                    : '불합격'}
                </Typography>
              )}
            </Box>
          </Box>
        </StepContent>
      </CardContent>
    </Box>
  );
}

const StepContent = styled(CenteredBox)({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '32px',
  gap: '24px',
});
