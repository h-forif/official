import { UseFormReturn } from 'react-hook-form';

import { Typography } from '@mui/material';

import { TAG_OPTIONS } from '@constants/apply.constant';
import { FormSelect } from '@packages/components/form/FormSelect';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudyExplanation({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  const explanation = form.watch('explanation');

  return (
    <>
      <Title
        title='스터디 설명'
        label='개설하려는 스터디에 대해 자세히 설명해주세요. 마크다운으로 작성해주세요!'
        pt={4}
      />
      <Typography variant='titleSmall' mb={1}>
        스터디 태그를 선택해주세요.
      </Typography>
      <FormSelect options={TAG_OPTIONS} control={form.control} name='tag' />
      <MDEditor
        value={explanation}
        onChange={(e) => form.setValue('explanation', e!)}
        style={{
          width: '100%',
          minHeight: '512px',
          marginTop: '16px',
          marginBottom: '16px',
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      <Typography variant='labelMedium' color={'error'}>
        {form.formState.errors.explanation?.message}
      </Typography>
    </>
  );
}
