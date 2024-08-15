import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';

import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/material';

import { Button, IconButton } from '@packages/components/Button';
import { FormInput } from '@packages/components/form/FormInput';
import { ApplyMentorSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';

export function StudyPlan({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ApplyMentorSchema>>;
}) {
  const { fields } = useFieldArray({
    control: form.control,
    name: 'study_plans',
  });

  const studyPlanContents = useWatch({
    control: form.control,
    name: 'study_plans',
  });

  const addNewContent = (sectionIndex: number) => {
    const currentContents = studyPlanContents[sectionIndex]?.content || [];
    form.setValue(`study_plans.${sectionIndex}.content`, [
      ...currentContents,
      '',
    ]);
  };

  const removeContent = (sectionIndex: number, contentIndex: number) => {
    const currentContents = studyPlanContents[sectionIndex]?.content || [];
    const newContents = currentContents.filter(
      (_, index) => index !== contentIndex,
    );
    form.setValue(`study_plans.${sectionIndex}.content`, newContents);
  };

  return (
    <>
      <Title
        title='스터디 계획서'
        label='15주차로 이루어진 스터디 계획을 작성해주세요.'
        pt={4}
        mb={0}
      />
      <Stack gap={5} justifyContent={'center'} alignItems={'center'} my={4}>
        {fields.map((item, sectionIndex) => {
          return (
            <Stack key={item.id} width={'100%'} gap={2}>
              <FormInput
                variant='outlined'
                control={form.control}
                name={`study_plans.${sectionIndex}.section`}
                label={`${sectionIndex + 1}주차 주제`}
                placeholder={`${sectionIndex + 1}주차 주제를 입력해주세요.`}
                required
              />
              {studyPlanContents[sectionIndex]?.content?.map(
                (_, contentIndex) => (
                  <FormInput
                    key={contentIndex}
                    variant='standard'
                    label={`${sectionIndex + 1}주차 내용을 입력해주세요.`}
                    control={form.control}
                    name={`study_plans.${sectionIndex}.content.${contentIndex}`}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          size='small'
                          onClick={() =>
                            removeContent(sectionIndex, contentIndex)
                          }
                        >
                          <ClearIcon />
                        </IconButton>
                      ),
                    }}
                  />
                ),
              )}
              <Button
                variant='outlined'
                size='large'
                fullWidth
                onClick={() => addNewContent(sectionIndex)}
              >
                주차별 내용 추가
              </Button>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}
