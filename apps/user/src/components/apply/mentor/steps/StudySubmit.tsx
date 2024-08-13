import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Box, Stack, Typography, useTheme } from '@mui/material';

import { TAG_OPTIONS } from '@constants/apply.constant';
import { Input } from '@packages/components/Input';
import { Select } from '@packages/components/Select';
import { FormInput } from '@packages/components/form/FormInput';
import MDEditor from '@uiw/react-md-editor';
import dayjs from '@utils/dayjs';
import formatMarkdown from '@utils/formatMarkdown';
import rehypeSanitize from 'rehype-sanitize';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudySubmit({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  const {
    difficulty,
    end_time,
    location,
    one_liner,
    primary_mentor_id,
    primary_mentor_name,
    secondary_mentor,
    secondary_mentor_id,
    secondary_mentor_name,
    start_time,
    name,
    explanation,
    tag,
    week_day,
    study_plans,
  } = form.getValues();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const mode = useTheme().palette.mode;
  return (
    <>
      <Title
        title='스터디 개설 신청서 제출'
        label='현재까지 작성한 정보 중 틀리거나 빠진 정보가 없는지 다시 한 번 확인해주세요. 수정하거나 정확하지 않은 정보가 있다면 "이전" 버튼을 통해 수정해주세요.'
        pt={4}
        px={0}
        mb={0}
      />
      <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
        <Typography variant='titleSmall'>멘토1</Typography>
        <Input
          required
          fullWidth
          label='학번'
          defaultValue={primary_mentor_id}
          disabled
        />
        <Input
          required
          fullWidth
          label='이름'
          defaultValue={primary_mentor_name}
          disabled
        />
        {secondary_mentor && (
          <>
            <Typography variant='titleSmall'>멘토2</Typography>
            <Input
              required
              fullWidth
              label='학번'
              defaultValue={secondary_mentor_id}
              disabled
            />
            <Input
              required
              fullWidth
              label='학번'
              defaultValue={secondary_mentor_name}
              disabled
            />
          </>
        )}
        <Typography variant='titleSmall'>스터디 정보</Typography>
        <Input
          required
          fullWidth
          label='스터디명'
          defaultValue={name}
          disabled
        />
        <Input
          required
          fullWidth
          label='한 줄 소개'
          defaultValue={one_liner}
          multiline
          maxRows={4}
          disabled
        />
        <Input
          required
          fullWidth
          label='난이도'
          defaultValue={difficulty}
          disabled
        />
        <Input
          required
          fullWidth
          label='장소'
          defaultValue={location}
          disabled
        />
        <Input
          required
          fullWidth
          label='요일'
          defaultValue={week_day}
          disabled
        />
        <Input
          required
          fullWidth
          label='시작 시간'
          defaultValue={dayjs(start_time).format('HH:mm')}
          disabled
        />
        <Input
          required
          fullWidth
          label='종료 시간'
          defaultValue={dayjs(end_time).format('HH:mm')}
          disabled
        />
        <Stack
          gap={5}
          justifyContent={'center'}
          alignItems={'center'}
          my={4}
          width={'100%'}
        >
          <Typography variant='titleSmall'>스터디 태그 및 설명</Typography>
          <Select
            options={TAG_OPTIONS}
            val={tag}
            placeholder={''}
            disabled
            minWidth={'100%'}
          />
          <Box
            width={'100%'}
            sx={{
              border: 1,
              borderRadius: 1,
              borderColor: 'divider',
            }}
            data-color-mode={mode}
          >
            <MDEditor.Markdown
              source={formatMarkdown(explanation)}
              rehypePlugins={[rehypeSanitize]}
              style={{ whiteSpace: 'pre-wrap', padding: 24 }}
            />
          </Box>
        </Stack>
        <Stack
          gap={5}
          justifyContent={'center'}
          alignItems={'center'}
          my={4}
          width={'100%'}
        >
          <Typography variant='titleSmall'>스터디 계획서</Typography>
          {study_plans.map((plan, sectionIndex) => (
            <Stack
              key={`${plan.section} - ${sectionIndex}`}
              width={'100%'}
              gap={2}
            >
              <FormInput
                variant='outlined'
                control={form.control}
                name={`study_plans.${sectionIndex}.section`}
                label={`${sectionIndex + 1}주차 주제`}
                placeholder={`${sectionIndex + 1}주차 주제를 입력해주세요.`}
                required
                disabled
                fullWidth
              />
              {plan.contents?.map((_, contentIndex) => (
                <FormInput
                  key={`${sectionIndex}-${contentIndex}`}
                  variant='standard'
                  label={`${sectionIndex + 1}주차 내용을 입력해주세요.`}
                  control={form.control}
                  name={`study_plans.${sectionIndex}.contents.${contentIndex}`}
                  fullWidth
                  disabled
                />
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
