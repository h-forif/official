import { Box, Stack, Typography } from '@mui/material';

import { StudyPlan } from '@packages/components/types/study';

interface StudyCurriculumProps {
  studyPlan: StudyPlan;
  index: number;
}

export default function StudyCurriculum({
  studyPlan: { section, content },
  index,
}: StudyCurriculumProps) {
  return (
    <>
      <Stack
        direction='row'
        p={3}
        borderRadius={4}
        border={1}
        borderColor={'divider'}
        alignItems='center'
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            mr: 2,
          }}
        >
          {index + 1}
        </Box>
        <Typography variant='bodyMedium'>
          {section === '' ? '휴강' : section}
        </Typography>
      </Stack>
      <Stack>
        {content.map((content, index) => (
          <Stack key={index} direction={'row'} alignItems={'center'} px={2}>
            <Stack
              position={'relative'}
              alignItems={'flex-start'}
              justifyContent={'center'}
              alignSelf={'stretch'}
              mr={3}
              sx={{
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  display: 'block',
                  zIndex: 0,
                  top: 0,
                  bottom: 0,
                  left: 7,
                  width: '.1rem',
                  height: '100%',
                  bgcolor: 'divider',
                },
              }}
            >
              <Stack
                width={16}
                height={16}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                my={2}
                zIndex={1}
              >
                <Box
                  width={16}
                  height={'auto'}
                  sx={{
                    aspectRatio: 1,
                    borderRadius: '50%',
                    border: '2px solid #fff',
                    bgcolor: 'lightgray',
                  }}
                ></Box>
              </Stack>
            </Stack>
            <Typography variant='bodySmall'>{content}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}
