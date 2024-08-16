import { ReactElement, ReactNode, Ref, forwardRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {
  AppBar,
  Box,
  BoxProps,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { GridRowId } from '@mui/x-data-grid';

import { TAG_OPTIONS, WEEKDAYS_OPTIONS } from '@constants/apply.constant';
import { MENTOR_DIFFICULTY_OPTIONS } from '@constants/filter.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@packages/components/Button';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { ApprovedApplication } from '@routes/studies/approve';
import { editNotApprovedStudy } from '@services/admin.service';
import { approveStudies } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { ApplyMentorSchema } from 'src/types/apply.schema';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ApplicationDialog({
  id,
  application,
  open,
  handleClose,
}: {
  id: number;
  application: ApprovedApplication;
  open: boolean;
  handleClose: () => void;
}) {
  const { openSingleButtonDialog, openDualButtonDialog, closeDialog } =
    useDialogStore();
  const [isEdit, setIsEdit] = useState(false);
  const [explanation, setExplanation] = useState(application.explanation);

  const saveExplanation = () => {
    form.setValue('explanation', explanation);
    setIsEdit(false);
  };

  const form = useForm<ApprovedApplication>({
    resolver: zodResolver(ApplyMentorSchema),
    defaultValues: {
      name: application.name,
      primary_mentor_id: application.primary_mentor_id,
      primary_mentor_name: application.primary_mentor_name,
      secondary_mentor_id: application.secondary_mentor_id,
      secondary_mentor_name: application.secondary_mentor_name,
      one_liner: application.one_liner,
      difficulty: application.difficulty,
      location: application.location,
      week_day: application.week_day,
      tag: application.tag,
      start_time: application.start_time,
      end_time: application.end_time,
      explanation: application.explanation,
      study_apply_plans: application.study_apply_plans,
    },
  });

  const handleEdit = async () => {
    const formData = form.getValues();
    try {
      await editNotApprovedStudy(id, formData);
      openSingleButtonDialog({
        title: '스터디 수정 완료',
        message: '스터디 정보가 수정되었습니다.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.CONFIRM,
      });
    } catch (err) {
      console.error(err);
      openSingleButtonDialog({
        title: '스터디 수정 실패',
        message: '스터디 정보 수정에 실패했습니다. 다시 시도해주세요.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.WARNING,
      });
    }
  };

  const handleApprove = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '스터디 승인',
      message: '해당 스터디를 승인할까요? 승인 즉시 부원들에게 노출됩니다.',
      mainButtonText: '승인',
      dialogIconType: DialogIconType.CONFIRM,
      mainButtonAction: async () => {
        try {
          await approveStudies([Number(id)]);
          closeDialog();
          openSingleButtonDialog({
            title: '해당 스터디가 승인되었습니다.',
            message:
              '해당 스터디가 승인되었습니다. "스터디 목록"에서 해당 스터디가 성공적으로 추가되었는지 확인해주세요.',
            mainButtonText: '확인',
            dialogIconType: DialogIconType.CONFIRM,
          });
        } catch (e) {
          console.error(`Failed to approve study with ID ${id}:`, e);
        }
      },
      subButtonText: '취소',
    });
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
        },
      }}
    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant='titleMedium'
            component='div'
          >
            {application.name}
          </Typography>
          <Button
            autoFocus
            color='inherit'
            disabled={application.status === 1}
            onClick={() => handleEdit()}
          >
            수정
          </Button>
          <Button
            autoFocus
            color='inherit'
            disabled={application.status === 1}
            onClick={() => handleApprove(id)}
          >
            승낙
          </Button>
        </Toolbar>
      </AppBar>
      <Layout width={'100%'}>
        <Title
          title='스터디 승인'
          label='아래 스터디 정보에서 부족하거나 수정해야할 부분이 있는지 확인해주세요. 확인이 끝났다면 오른쪽 위 승인 버튼을 클릭하여 승인 절차를 진행해주세요.'
        />
        <Typography variant='bodySmall' mb={2}>
          멘토의 수정이 필요하다면 "멘토 정보" 박스에서 전화번호 확인 후, 해당
          전화번호로 정중하게 연락해주세요.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                한 줄 소개
              </Typography>
              <FormInput
                control={form.control}
                name='one_liner'
                fullWidth
                multiline
                minRows={2}
                sx={{
                  mb: 2,
                }}
              />
              <Typography variant='bodySmall' color={'text.secondary'}>
                스터디에 대한 간략한 설명입니다. 흥미를 유발하고, 참여자들에게
                스터디의 목적을 알려주고 있는 지 확인해주세요.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                멘토 정보
              </Typography>
              <Box
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Box>
                    <Typography variant='bodySmall'>
                      {application.primary_mentor_name}
                      <br />
                      {application.primary_mentor_phone_number}
                    </Typography>
                  </Box>
                  {application.secondary_mentor_id && (
                    <>
                      <Divider flexItem orientation='vertical' />
                      <Box>
                        <Typography variant='bodySmall'>
                          {application.secondary_mentor_name}
                        </Typography>
                        <Typography variant='bodySmall'>
                          {application.primary_mentor_phone_number}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Stack>
              </Box>
              <Typography variant='bodySmall' color={'text.secondary'}>
                멘토의 수정이 필요하다면 "멘토 정보" 박스에서 전화번호 확인 후,
                해당 전화번호로 정중하게 연락해주세요.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                진행 요일
              </Typography>
              <FormSelect
                control={form.control}
                name='week_day'
                options={WEEKDAYS_OPTIONS}
                minWidth={'100%'}
                disabled
              />
              <Typography variant='bodySmall' my={2}>
                진행 시간
              </Typography>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                mb={2}
              >
                <TextField value={application.start_time} disabled />
                <Typography variant='bodyLarge'>-</Typography>
                <TextField value={application.end_time} disabled />
              </Stack>
              <Typography variant='bodySmall' color={'text.secondary'}>
                진행 요일 및 진행 시간은 수정할 수 없습니다. 멘토님의 요청이
                있을 시 회장단 혹은 SW팀에 문의바랍니다.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={6}>
            <BorderBox>
              <Typography variant='bodySmall' mb={2}>
                난이도
              </Typography>
              <FormSelect
                control={form.control}
                name='difficulty'
                options={MENTOR_DIFFICULTY_OPTIONS}
                minWidth={'100%'}
              />
              <Typography variant='bodySmall' my={2}>
                태그
              </Typography>
              <FormSelect
                options={TAG_OPTIONS}
                control={form.control}
                name='tag'
                sx={{ mb: 2 }}
              />
              <Typography variant='bodySmall' color={'text.secondary'}>
                난이도가 <strong>'운영진의 판단에 맡김'</strong>으로 되어 있을
                시 스터디 난이도를 직접 수정해주세요. 태그가 스터디의 주제를 잘
                나타내는지 확인해주세요.
              </Typography>
            </BorderBox>
          </Grid>
          <Grid item xs={12}>
            <BorderBox
              props={{
                position: 'relative',
              }}
            >
              <IconButton
                size='large'
                sx={{
                  position: 'absolute',
                  zIndex: 10,
                  right: 10,
                }}
                onClick={() => (isEdit ? saveExplanation() : setIsEdit(true))}
              >
                {isEdit ? (
                  <DoneIcon color='primary' />
                ) : (
                  <EditIcon color='primary' />
                )}
              </IconButton>
              <Typography
                variant='titleSmall'
                textAlign={'center'}
                mb={5}
                mt={4}
              >
                스터디 설명
              </Typography>
              <Typography variant='bodySmall' color={'text.secondary'} mb={5}>
                * 스터디에 대한 자세한 설명입니다. 마크다운으로 작성된 만큼,
                오타가 발생하지 않았는지 확인해주세요.
              </Typography>
              <Divider />
              <Box>
                {isEdit ? (
                  <TextField
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    fullWidth
                    multiline
                    minRows={10}
                    sx={{
                      mb: 2,
                    }}
                  />
                ) : (
                  <Markdown>{explanation}</Markdown>
                )}
              </Box>
            </BorderBox>
          </Grid>
          <Grid item xs={12}>
            <BorderBox>
              <Stack gap={5} my={4} width={'100%'}>
                <Typography variant='titleSmall' textAlign={'center'}>
                  커리큘럼
                </Typography>
                <Typography
                  component={'ul'}
                  variant='bodySmall'
                  color={'text.secondary'}
                >
                  * 커리큘럼은 부원들이 스터디를 선택하는 가장 중요한
                  요소입니다. 다음과 같은 내용들을 확인해주세요.
                  <li>1. 실질적인 스터디 일정이 8주차 이상인가?</li>
                  <li>2. 중간고사 / 기말고사를 고려한 스터디일정인가?</li>
                  <li>
                    3. 온라인 수업이 시험기간을 제외한 기간에 포함되어 있는가?
                  </li>
                  <li>4. 오타는 없는가?</li>
                  <Typography
                    component={'span'}
                    variant='bodySmall'
                    color={'text.primary'}
                  >
                    개발 미흡으로 커리큘럼은 현재 수정이 불가능합니다. 만약
                    수정사항이나 문제가 있다면 회장단이나 SW팀에{' '}
                    <strong>반드시</strong> 말씀해주세요.
                  </Typography>
                </Typography>
                <Divider />
                {application.study_apply_plans.map((plan, sectionIndex) => {
                  const contents = plan.content.split(';');
                  return (
                    <Stack
                      key={`${plan.section} - ${sectionIndex}`}
                      width={'100%'}
                      gap={2}
                    >
                      <Typography variant='titleMedium'>
                        {sectionIndex + 1}주차. {plan.section}
                      </Typography>
                      <Stack component={'ul'} gap={1} my={0}>
                        {contents.map((content, index) => (
                          <Typography
                            component={'li'}
                            key={index}
                            variant='bodySmall'
                          >
                            {content}
                          </Typography>
                        ))}
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </BorderBox>
          </Grid>
        </Grid>
      </Layout>
    </Dialog>
  );
}

function BorderBox({
  children,
  props,
}: {
  children: ReactNode;
  props?: BoxProps;
}) {
  return (
    <Box
      border={1}
      borderColor={'divider'}
      p={3}
      width={'100%'}
      borderRadius={2}
      minHeight={240}
      {...props}
    >
      {children}
    </Box>
  );
}
