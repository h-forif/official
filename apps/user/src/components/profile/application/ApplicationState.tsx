import { useState } from 'react';

import { Box, CardContent, Step, StepLabel, Stepper } from '@mui/material';

import { Application } from 'src/types/apply.schema';

const steps = ['지원서 작성 중', '제출 완료', '검토 중', '합격 여부'];

export function ApplicationState({
  application,
}: {
  application: Application;
}) {
  console.log(application);

  const [activeStep] = useState(0);

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
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </CardContent>
    </Box>
  );
}
