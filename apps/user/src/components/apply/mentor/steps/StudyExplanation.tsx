import { UseFormReturn } from 'react-hook-form';
import Markdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/system';

import { Layout } from '@packages/components/elements/Layout';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { TAG_OPTIONS } from '@packages/constants';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudyExplanation({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  const explanation = form.watch('explanation');
  const mode = useTheme().palette.mode;
  return (
    <Box data-color-mode={mode}>
      <Title
        title='스터디 설명'
        label='개설하려는 스터디에 대해 자세히 설명해주세요. 마크다운(Markdown) 형식이 적용됩니다.'
        pt={4}
      />

      <Layout>
        <Typography variant='titleSmall' mb={1}>
          스터디 분야를 선택해주세요.
        </Typography>
        <FormSelect
          options={TAG_OPTIONS}
          control={form.control}
          name='tag'
          label='자신의 스터디에 가장 잘 어울리는 분야를 선택해주세요.'
          required
        />
        <Typography variant='titleSmall' mt={2} mb={1}>
          스터디 설명을 작성해주세요.
        </Typography>
        <Stack direction={'row'} gap={2}>
          <FormInput
            control={form.control}
            name='explanation'
            multiline
            minRows={18}
            fullWidth
          />
          <Box
            border={1}
            borderColor={'divider'}
            p={2}
            sx={{
              flexGrow: 1,
              flexBasis: '50%',
              minWidth: '60%',
            }}
          >
            <Markdown
              children={explanation}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      PreTag={'div'}
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Box>
        </Stack>
      </Layout>
    </Box>
  );
}
