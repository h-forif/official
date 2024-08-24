import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Stack, Typography } from '@mui/material';

import {
  APPLY_PATH_OPTIONS,
  RECRUIT_END_DATE,
  RECRUIT_START_DATE,
} from '@constants/apply.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { Select, SelectOption } from '@packages/components/Select';
import { FormCheckbox } from '@packages/components/form/FormCheckbox';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { applyMember, getApplication } from '@services/apply.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import {
  createFileRoute,
  useBlocker,
  useNavigate,
  useRouter,
} from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';
import { handleGlobalError } from '@utils/handleGlobalError';
import { refineApplyForm } from '@utils/refine';
import axios from 'axios';
import { getAllStudies } from 'src/services/study.service';
import { getTeam, getUser } from 'src/services/user.service';
import { ApplyMemberSchema } from 'src/types/apply.schema';
import { z } from 'zod';

import { Title } from '@components/Title';
import CautionList from '@components/apply/member/CautionList';
import BlockModal from '@components/common/BlockModal';

import { usePeriod } from '@hooks/usePeriod';

const STORAGE_KEY = 'applyMemberForm';

export const Route = createFileRoute('/apply/member')({
  loader: async () => {
    const currentTerm = getCurrentTerm();
    const [userInfo, studies] = await Promise.all([
      getUser(),
      getAllStudies({
        year: Number(currentTerm.year),
        semester: Number(currentTerm.semester),
      }),
    ]);
    return { userInfo, studies };
  },
  onError: (err) => {
    handleGlobalError(err);
  },
  component: ApplyMember,
});

function ApplyMember() {
  useEffect(() => {
    const checkApplication = async () => {
      try {
        const application = await getApplication();
        if (application) {
          window.location.href = '/profile/application';
        }
      } catch (err) {
        // 에러 무시
      }
    };

    checkApplication();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loaderData = Route.useLoaderData();
  const navigate = useNavigate();
  const router = useRouter();
  const { studies, userInfo } = loaderData;

  const [isSaved, setIsSaved] = useState(false);
  const { closeDialog, openSingleButtonDialog } = useDialogStore();

  const { id, name, department, phone_number } = userInfo!;
  const { isIncluded } = usePeriod(RECRUIT_START_DATE, RECRUIT_END_DATE);

  const form = useForm<z.infer<typeof ApplyMemberSchema>>({
    resolver: zodResolver(ApplyMemberSchema),
    defaultValues: {
      primary_study: '',
      primary_intro: '',
      secondary_study: '',
      secondary_intro: '',
      apply_path: '',
      is_primary_study_only: false,
    },
  });

  const { proceed, reset, status } = useBlocker({
    condition: !isSaved,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  const handleSaveDraft = () => {
    const formData = form.getValues();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setIsSaved(true);
    openSingleButtonDialog({
      dialogIconType: DialogIconType.CONFIRM,
      title: '임시 저장',
      message: '스터디 신청서 임시 저장을 완료했습니다.',
      mainButtonText: '확인',
      mainButtonAction: () => {
        closeDialog();
      },
    });
  };

  const primary_study = form.watch('primary_study');
  const secondary_study = form.watch('secondary_study');
  const is_primary_study_only = form.watch('is_primary_study_only');

  const options: SelectOption[] = studies!.map((study) => ({
    value: study.id.toString(),
    label: study.id === 0 ? '자율부원으로 신청' : study.name,
  }));

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.setValue('is_primary_study_only', e.target.checked);
  };

  const filteredSecondaryOptions = options.filter(
    (option) => option.value !== primary_study,
  );

  const onSubmit = async (formData: z.infer<typeof ApplyMemberSchema>) => {
    const teams = await getTeam({
      year: 2024,
      semester: 2,
    });
    const teamNames = teams.map((team) => team.user.name);

    if (!teamNames.includes(name)) {
      openSingleButtonDialog({
        dialogIconType: DialogIconType.WARNING,
        title: '테스트 기간 신청',
        message: '테스트 기간 중에는 신청할 수 없습니다.',
        mainButtonText: '확인',
      });
      return;
    }

    const application = refineApplyForm(formData);

    setIsSaved(true);
    try {
      await applyMember(application);
      router.invalidate();
      openSingleButtonDialog({
        dialogIconType: DialogIconType.CONFIRM,
        title: '스터디 신청서 제출 완료',
        mainButtonText: '확인',
        mainButtonAction: () => {
          closeDialog();
          navigate({ to: '/profile/application' });
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        openSingleButtonDialog({
          dialogIconType: DialogIconType.WARNING,
          title: '신청 오류 발생',
          message: '자신의 스터디는 신청할 수 없습니다.',
          mainButtonText: '확인',
          mainButtonAction: () => {
            closeDialog();
          },
        });
      } else {
        openSingleButtonDialog({
          dialogIconType: DialogIconType.WARNING,
          title: '신청 오류 발생',
          message: `알 수 없는 오류가 발생했습니다:  ${error}`,
          mainButtonText: '확인',
          mainButtonAction: () => {
            closeDialog();
          },
        });
      }
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            width: { xs: '100%', md: '512px' },
            px: { xs: 2 },
            pb: 4,
            margin: 'auto',
          }}
        >
          <Title
            title='스터디 신청'
            label={`${RECRUIT_START_DATE} - ${RECRUIT_END_DATE}`}
            mb={3}
          />
          <CautionList />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Stack
              gap={5}
              justifyContent={'center'}
              alignItems={'center'}
              my={4}
            >
              <Typography variant='titleSmall'>신청 부원 정보</Typography>
              <Input
                required
                fullWidth
                label='학번'
                defaultValue={id}
                disabled
              />
              <Input
                required
                fullWidth
                label='이름'
                defaultValue={name}
                disabled
              />
              <Input
                required
                fullWidth
                label='학과'
                defaultValue={department}
                disabled
              />
              <Input
                required
                fullWidth
                label='전화번호'
                defaultValue={phone_number}
                disabled
              />
            </Stack>
            <Stack
              gap={5}
              justifyContent={'center'}
              alignItems={'center'}
              my={4}
              width={'100%'}
            >
              <Typography variant='titleSmall'>
                1순위 스터디(혹은 자율부원으로) 신청
              </Typography>
              <FormSelect
                minWidth={'100%'}
                options={options}
                control={form.control}
                name='primary_study'
                label='1순위 스터디를 선택해주세요.'
                disabled={!isIncluded}
                required
              />
              <FormInput
                control={form.control}
                name='primary_intro'
                label='1순위 스터디 신청 사유를 작성해주세요.'
                fullWidth
                multiline
                maxRows={4}
                disabled={primary_study === '0' || !isIncluded}
                required
              />
              <Typography variant='titleSmall'>
                2순위 스터디(혹은 자율부원으로) 신청
              </Typography>
              <FormCheckbox
                control={form.control}
                disabled={primary_study === '0' || primary_study === ''}
                onChange={handleCheckBoxChange}
                label={
                  <Typography variant='labelSmall' component={'span'}>
                    1순위 스터디에 선정되지 않을 시 2순위 스터디를 수강하지
                    않겠습니다.
                    <br />
                    <Typography variant='labelSmall' color={'text.secondary'}>
                      (이 결정은 신청서 제출 이후에도 스터디 신청 기간 내에서
                      자유롭게 변경할 수 있습니다.)
                    </Typography>
                  </Typography>
                }
                name='is_primary_study_only'
              />
              <FormSelect
                name='secondary_study'
                control={form.control}
                options={filteredSecondaryOptions}
                label='2순위 스터디를 선택해주세요.'
                minWidth={'100%'}
                required={!is_primary_study_only}
                disabled={
                  is_primary_study_only ||
                  primary_study === '0' ||
                  primary_study === '' ||
                  !isIncluded
                }
              />
              <FormInput
                multiline
                maxRows={4}
                label='2순위 스터디 신청 사유를 작성해주세요.'
                name='secondary_intro'
                control={form.control}
                disabled={
                  primary_study === '0' ||
                  primary_study === '' ||
                  secondary_study === '0' ||
                  primary_study === '' ||
                  is_primary_study_only ||
                  !isIncluded
                }
                required={!is_primary_study_only}
                fullWidth
              />
              <Typography variant='titleSmall'>포리프를 접한 경로</Typography>
              <Controller
                name='apply_path'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Select
                    required
                    id='from-select'
                    val={field.value}
                    setVal={field.onChange}
                    placeholder='포리프를 접하게 된 경로를 작성해주세요.'
                    options={APPLY_PATH_OPTIONS}
                    error={!!fieldState.error}
                    errorMessage='지원 경로는 필수값입니다.'
                    minWidth={'100%'}
                    disabled={!isIncluded}
                  />
                )}
              />
            </Stack>
            <Stack direction={'row'} gap={2}>
              <Button
                variant='outlined'
                size='large'
                fullWidth
                disabled={(!form.formState.isDirty && isSaved) || !isIncluded}
                onClick={handleSaveDraft}
              >
                임시저장
              </Button>
              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={!isIncluded}
              >
                제출
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      {status === 'blocked' && (
        <BlockModal
          title='스터디 신청서 작성 중'
          description='신청서의 내용을 저장하지 않고 다른 페이지로 이동시에 작성중인 신청서의
          내용이 사라질 수 있습니다.'
          proceed={proceed}
          reset={reset}
        />
      )}
    </>
  );
}
