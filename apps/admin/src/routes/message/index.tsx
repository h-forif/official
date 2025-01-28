import { SyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import {
  ALL_MESSAGE_TEMPLATE_OPTIONS,
  ETC_MESSAGE_TEMPLATE_OPTIONS,
  FAIL_MESSAGE_TEMPLATE_OPTIONS,
  PASS_MESSAGE_TEMPLATE_OPTIONS,
} from '@constants/message.constant';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { Select } from '@packages/components/Select';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { REVIEW_END_DATE } from '@packages/constants';
import { AllApplication, getAllApplications } from '@services/admin.service';
import {
  MessageBody,
  TemplateList,
  getMessageTemplates,
  sendMessage,
} from '@services/message.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  onlyAutoApplications,
  onlyFailApplications,
  onlyRegularApplications,
} from '@utils/filter';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { Layout } from '@components/common/Layout';
import { TabPanel } from '@components/common/TabPanel';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/message/')({
  component: MessagePage,
});

function a11yProps(index: number) {
  return {
    id: `message-tab-${index}`,
    'aria-controls': `message-tabpanel-${index}`,
  };
}

function MessagePage() {
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(
    ALL_MESSAGE_TEMPLATE_OPTIONS[0]!.value,
  );
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const { data: templateList } = useQuery({
    queryKey: ['alim-talk-template-list'],
    queryFn: () => getMessageTemplates(),
  });
  const [selectedTemplateContent, setSelectedTemplateContent] =
    useState<TemplateList>();
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState({
    content: '',
    extra: '',
    buttonName: '',
    link: '',
  });

  useEffect(() => {
    if (templateList) {
      const template = templateList.templateList.find(
        (template) => template.templateId === selectedTemplate,
      );
      setSelectedTemplateContent(template);
    }
  }, [templateList, selectedTemplate]);

  const form = useForm<MessageBody>({
    defaultValues: {
      dateTime: dayjs('2024-09-06T18:00:00'),
      location: '한양대학교 IT/BT관 508호',
      responseSchedule: dayjs('2024-09-04 17:00'),
      url: 'forms.gle/ecMLJ5fxTLFNZ52a6', //TODO: Change form link every semester
      templateCode: '',
    },
  });

  const templateCode = form.watch('templateCode');
  useEffect(() => {
    const formData = form.getValues();
    const selectedTemplate = templateList?.templateList.find(
      (template) => template.templateId === templateCode,
    );
    if (selectedTemplate) {
      const filledTemplate = {
        content: selectedTemplate.content
          .replace(
            /#{응답일정}/g,
            formData.responseSchedule.format('YYYY-MM-DD HH:mm'),
          )
          .replace(/#{일시}/g, formData.dateTime.format('YYYY-MM-DD HH:mm'))
          .replace(/#{장소}/g, formData.location),
        extra: selectedTemplate.extra,
        buttonName: selectedTemplate!.buttons[0]!.buttonName,
        link: formData.url,
      };
      setSelectedPreviewTemplate({
        content: filledTemplate.content,
        extra: filledTemplate.extra,
        buttonName: filledTemplate.buttonName,
        link: filledTemplate.link,
      });
    }
  }, [form, templateCode, templateList]);

  const [tabValue, setTabValue] = useState(0);
  const [isRegularStudy, setIsRegularStudy] = useState(true);
  dayjs.locale('ko');
  const { openDualButtonDialog, openSingleButtonDialog, closeDialog } =
    useDialogStore();
  const { data: applications, isLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: () => getAllApplications(),
  });

  useEffect(() => {
    if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[0]!.value) {
      setIsRegularStudy(true);
    } else if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[1]!.value) {
      setIsRegularStudy(false);
    }
  }, [templateCode]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    switch (newValue) {
      // 합격 부원 대상
      case 0:
        form.setValue('templateCode', PASS_MESSAGE_TEMPLATE_OPTIONS[0]!.value);
        setTabValue(0);
        break;
      // 불합격 부원 대상
      case 1:
        form.setValue('templateCode', FAIL_MESSAGE_TEMPLATE_OPTIONS[0]!.value);
        setTabValue(1);
        break;
      // 미등록 부원 대상
      case 2:
        form.setValue('templateCode', ETC_MESSAGE_TEMPLATE_OPTIONS[0]!.value);
        setTabValue(2);
        break;
      default:
        setTabValue(0);
    }
  };

  // TODO: 자율일때와 정규일때 함수 분리
  const handleSendToPass = () => {
    const { dateTime, location, responseSchedule, templateCode, url } =
      form.getValues();
    const regularApplications = applications?.filter(onlyRegularApplications);
    const autoApplications = applications?.filter(onlyAutoApplications);
    openDualButtonDialog({
      dialogIconType: DialogIconType.CONFIRM,
      title: '문자 발송',
      message: `${isRegularStudy ? '정규 스터디 합격 부원' : '자율부원'}(총 ${isRegularStudy ? regularApplications?.length : autoApplications?.length}명)에게 문자를 발송할까요?`,
      mainButtonText: '발송',
      mainButtonAction: async () => {
        // 문자 발송 로직
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[0]!.value) {
          // 정규 스터디 합격자에게 문자 발송
          const messagePromises = regularApplications!.map(
            async (application) => {
              // 조건에 맞는 사용자에게 메시지 발송
              const phoneNumber = application.phone_number;
              const studyName =
                application.primary_status === '승낙'
                  ? application.primary_study_name
                  : application.secondary_study_name;

              if (phoneNumber && studyName) {
                try {
                  await sendMessage({
                    receivers: [phoneNumber],
                    studyName: studyName,
                    responseSchedule: responseSchedule,
                    dateTime: dateTime,
                    location: location,
                    url: url,
                    templateCode: templateCode,
                  });
                } catch (e) {
                  console.error(`Failed to send message to ${studyName}`, e);
                }
              }
            },
          );

          await Promise.all(messagePromises);
        }
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[1]!.value) {
          // 자율 스터디 합격자에게 문자 발송
          const phoneNumbers = autoApplications?.map(
            (user) => user.phone_number,
          );
          if (phoneNumbers?.length === 0) {
            openSingleButtonDialog({
              dialogIconType: DialogIconType.WARNING,
              title: '문자 발송 실패',
              message:
                '자율 스터디 합격자가 없습니다. 문자 발송 대상자에 유저가 있는지 확인해주세요.',
              mainButtonText: '확인',
            });
            return;
          }
          try {
            await sendMessage({
              receivers: phoneNumbers!,
              responseSchedule: responseSchedule,
              dateTime: dateTime,
              location: location,
              url: url,
              templateCode: templateCode,
            });
            closeDialog();
            openSingleButtonDialog({
              dialogIconType: DialogIconType.CONFIRM,
              title: '문자 발송 완료',
              message: '자율 스터디 합격자에게 문자를 발송했습니다.',
              mainButtonText: '확인',
            });
          } catch (e) {
            console.error(
              `Failed to send message to auto study to ${phoneNumbers}`,
              e,
            );
            closeDialog();
            openSingleButtonDialog({
              dialogIconType: DialogIconType.WARNING,
              title: '문자 발송 실패',
              message: `오류가 발생했습니다.${e}`,
              mainButtonText: '확인',
            });
          }
        }
      },
      subButtonText: '취소',
      subButtonAction: closeDialog,
    });
  };

  const handleSendToFail = () => {
    const failApplications = applications?.filter((val) =>
      onlyFailApplications(val),
    );
    const { dateTime, location, responseSchedule, templateCode, url } =
      form.getValues();
    openDualButtonDialog({
      dialogIconType: DialogIconType.CONFIRM,
      title: '문자 발송',
      message: `정규 스터디 불합격 부원(총 ${failApplications?.length}명)에게 문자를 발송할까요?`,
      mainButtonText: '발송',
      mainButtonAction: async () => {
        const phoneNumbers = failApplications?.map(
          (application) => application.phone_number,
        );
        if (phoneNumbers?.length === 0) {
          openSingleButtonDialog({
            dialogIconType: DialogIconType.WARNING,
            title: '문자 발송 실패',
            message:
              '자율 스터디 합격자가 없습니다. 문자 발송 대상자에 유저가 있는지 확인해주세요.',
            mainButtonText: '확인',
          });
          return;
        }

        try {
          await sendMessage({
            receivers: phoneNumbers!,
            responseSchedule: responseSchedule,
            dateTime: dateTime,
            location: location,
            url: url,
            templateCode: templateCode,
          });
          closeDialog();
          openSingleButtonDialog({
            dialogIconType: DialogIconType.CONFIRM,
            title: '문자 발송 완료',
            message: '자율 스터디 불합격자에게 문자를 발송했습니다.',
            mainButtonText: '확인',
          });
        } catch (e) {
          console.error(
            `Failed to send message to auto study to ${phoneNumbers}`,
            e,
          );
        }
      },
      subButtonText: '취소',
    });
  };

  const handleSendToEtc = () => {};

  const handleTemplateDialogOpen = () => {
    setIsTemplateDialogOpen(true);
  };

  return (
    <Layout>
      <Title title='문자 발송 서비스' label='문자 발송 서비스 관리' />
      <Box display={'flex'} alignItems={'end'} justifyContent={'end'}>
        <Button onClick={handleTemplateDialogOpen}>
          알림톡 템플릿 목록 보기
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='합격 부원 대상' {...a11yProps(0)} />
          <Tab label='불합격 부원 대상' {...a11yProps(1)} />
          <Tab label='그 외' {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/* 합격 부원 대상 */}
      <TabPanel value={tabValue} index={0}>
        <Box>
          <Typography variant='titleMedium'>
            정규 스터디 합격자 혹은 자율 부원 신청자에게 문자 발송
          </Typography>
          <Typography variant='labelMedium'>
            멘토들이 승낙을 마치는 시간 이후(
            {dayjs(REVIEW_END_DATE).format('YYYY-MM-DD HH:mm')}에 발송해주세요.)
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item md={4} sm={12}>
              <Controller
                control={form.control}
                name='dateTime'
                render={({ field: { onChange, value, ref } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ko'
                  >
                    <DateTimePicker
                      label='OT가 진행되는 시간을 선택해주세요.'
                      sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                      }}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <Controller
                control={form.control}
                name='responseSchedule'
                render={({ field: { onChange, value, ref } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ko'
                  >
                    <DateTimePicker
                      label='구글폼 응답 기한을 선택해주세요.'
                      sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                      }}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <FormInput
                control={form.control}
                name='location'
                placeholder='한양대학교 IT/BT관 508호'
                label='OT 진행 장소'
                fullWidth
                required
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                control={form.control}
                name='url'
                placeholder='등록 폼 링크를 입력해주세요.'
                label='구글폼 링크(https:// 붙이지 마세요.)'
                fullWidth
                required
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                control={form.control}
                name='templateCode'
                options={PASS_MESSAGE_TEMPLATE_OPTIONS}
                label='템플릿 종류 선택'
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                onClick={() => setIsPreviewDialogOpen(true)}
                fullWidth
              >
                발송 내용 미리보기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSendToPass}
                fullWidth
              >
                스터디 합격자에게 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={templateCode}
            applications={applications}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
      {/* 정규스터디 불합격 부원 대상 */}
      {/* OT 등의 정보가 들어가는 이유는 자율부원 추가 신청을 받기 위함임 */}
      <TabPanel value={tabValue} index={1}>
        <Box>
          <Typography variant='titleMedium'>
            정규 스터디 불합격자에게 문자 발송
          </Typography>
          <Typography variant='labelMedium'>
            멘토들이 승낙을 마치는 시간 이후(
            {dayjs(REVIEW_END_DATE).format('YYYY-MM-DD HH:mm')}에 발송해주세요.)
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item md={4} sm={12}>
              <Controller
                control={form.control}
                name='dateTime'
                render={({ field: { onChange, value, ref } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ko'
                  >
                    <DateTimePicker
                      label='OT가 진행되는 시간을 선택해주세요.'
                      sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                      }}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <Controller
                control={form.control}
                name='responseSchedule'
                render={({ field: { onChange, value, ref } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ko'
                  >
                    <DateTimePicker
                      label='구글폼 응답 기한을 선택해주세요.'
                      sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                      }}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item md={4} sm={12}>
              <FormInput
                control={form.control}
                name='location'
                placeholder='한양대학교 IT/BT관 508호'
                label='OT 진행 장소'
                fullWidth
                required
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                control={form.control}
                name='url'
                placeholder='등록 폼 링크를 입력해주세요.'
                label='구글폼 링크(https:// 붙이지 마세요.)'
                fullWidth
                required
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                control={form.control}
                name='templateCode'
                options={FAIL_MESSAGE_TEMPLATE_OPTIONS}
                label='템플릿 종류 선택'
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                onClick={() => setIsPreviewDialogOpen(true)}
                fullWidth
              >
                발송 내용 미리보기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSendToFail}
                fullWidth
              >
                스터디 불합격자에게 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={templateCode}
            applications={applications}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
      {/* 그 외 부원 대상 */}
      <TabPanel value={tabValue} index={2}>
        <Box>
          <Typography variant='titleMedium'>
            그 외 사유로 문자 발송(This time, we decide to call api directly
            using spreadsheet.)
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Controller
                control={form.control}
                name='responseSchedule'
                render={({ field: { onChange, value, ref } }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='ko'
                  >
                    <DateTimePicker
                      label='구글폼 응답 기한을 선택해주세요.'
                      sx={{
                        width: '100%',
                        bgcolor: 'background.default',
                      }}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormInput
                control={form.control}
                name='url'
                placeholder='등록 폼 링크를 입력해주세요.'
                label='구글폼 링크(https:// 붙이지 마세요.)'
                fullWidth
                required
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormSelect
                control={form.control}
                name='templateCode'
                options={ETC_MESSAGE_TEMPLATE_OPTIONS}
                label='템플릿 종류 선택'
                sx={{
                  bgcolor: 'background.default',
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='outlined'
                color='primary'
                size='large'
                onClick={() => setIsPreviewDialogOpen(true)}
                fullWidth
              >
                발송 내용 미리보기
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSendToEtc}
                fullWidth
              >
                그 외 사유로 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={templateCode}
            applications={applications}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
      {/* 알림톡 템플릿 목록 보기 */}
      <Dialog
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        aria-labelledby='template-list-dialog-title'
        aria-describedby='template-list-dialog-description'
      >
        <DialogTitle id='template-list-dialog-title'>
          알림톡 템플릿 목록
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='template-list-dialog-description'
            sx={{
              mb: 2,
            }}
          >
            템플릿은 카카오톡 채널을 통해 전송되는 메시지의 형식을 정의합니다.
            템플릿은 전송되기까지 평균 1~3일의 검수 기간이 소요되므로 미리
            등록해두시는 것이 좋습니다.
          </DialogContentText>
          <Select
            options={ALL_MESSAGE_TEMPLATE_OPTIONS}
            val={selectedTemplate}
            placeholder='템플릿을 선택해주세요.'
            setVal={(v) => setSelectedTemplate(v)}
          />
          <Typography variant='bodySmall' mt={2} whiteSpace={'pre-wrap'}>
            {selectedTemplateContent?.content}
          </Typography>
          <Typography variant='bodySmall' mt={2} whiteSpace={'pre-wrap'}>
            {selectedTemplateContent?.extra}
          </Typography>
          <Button fullWidth sx={{ mt: 2 }} variant='contained'>
            {selectedTemplateContent?.buttons[0]?.buttonName}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTemplateDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
      {/* 발송 내용 미리 보기 */}
      <Dialog
        open={isPreviewDialogOpen}
        onClose={() => setIsPreviewDialogOpen(false)}
        aria-labelledby='template-preview-dialog-title'
        aria-describedby='template-preview-dialog-description'
      >
        <DialogTitle id='template-preview-dialog-title'>
          발송 내용 미리 보기
        </DialogTitle>
        <DialogContent>
          <Typography variant='bodySmall' mt={2} whiteSpace={'pre-wrap'}>
            {selectedPreviewTemplate.content}
          </Typography>
          <Typography variant='bodySmall' mt={2} whiteSpace={'pre-wrap'}>
            {selectedPreviewTemplate.extra}
          </Typography>
          <a href={`https://${selectedPreviewTemplate.link}`} target='_blank'>
            <Button variant='contained' sx={{ mt: 2 }} fullWidth>
              {selectedPreviewTemplate.buttonName}
            </Button>
          </a>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPreviewDialogOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}

interface UserListProps {
  applications: AllApplication[] | undefined;
  templateCode: string;
  isLoading: boolean;
}

function UserList({ applications, isLoading, templateCode }: UserListProps) {
  const [searchedApplications, setSearchedApplications] = useState<
    AllApplication[] | undefined
  >();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (applications) {
      // Filter applications based on the selected template code
      const filteredApplications = applications.filter((application) => {
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[0]!.value) {
          return onlyRegularApplications(application);
        }
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[1]!.value) {
          return onlyAutoApplications(application);
        }
        if (templateCode === FAIL_MESSAGE_TEMPLATE_OPTIONS[0]!.value) {
          return onlyFailApplications(application);
        }
      });

      setSearchedApplications(
        filteredApplications.filter(
          (user) =>
            user.name.includes(searchText) ||
            user.phone_number?.includes(searchText),
        ),
      );
    }
  }, [searchText, applications, templateCode]);

  if (isLoading) {
    return (
      <Box mt={4}>
        <Typography variant='titleMedium'>문자 발송 대상자 목록</Typography>
        <List>
          {Array.from({ length: 5 }).map((_, index) => (
            <ListItem key={index}>
              <Stack direction={'column'} gap={1}>
                <Skeleton variant='rounded' width={'120px'} height={'24px'} />
                <Skeleton variant='rounded' width={'240px'} height={'20px'} />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant='titleMedium' mb={1}>
        문자 발송 대상자 목록(총 {searchedApplications?.length}명)
      </Typography>
      <Input
        search
        placeholder='이름을 검색해보세요.'
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <List>
        {searchedApplications?.map((user) => (
          <ListItem key={user.user_id}>
            <ListItemText primary={user.name} secondary={user.phone_number} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
