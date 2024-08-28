import { SyntheticEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Box,
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
  FAIL_MESSAGE_TEMPLATE_OPTIONS,
  PASS_MESSAGE_TEMPLATE_OPTIONS,
  REGULAR_STUDY_FAIL_TEMPLATE_CODE,
  URGENT_MESSAGE_TEMPLATE_OPTIONS,
  URGENT_TEMPLATE_CODE,
} from '@constants/message.constant';
import { Button } from '@packages/components/Button';
import { Input } from '@packages/components/Input';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import {
  MessageBody,
  sendPassedRegularStudyMessage,
} from '@services/message.service';
import { PaidUser, getUnpaidUsers } from '@services/pay.service';
import { getStudyInfo } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
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
  const [tabValue, setTabValue] = useState(0);

  dayjs.locale('ko');
  const { openDualButtonDialog, openSingleButtonDialog, closeDialog } =
    useDialogStore();
  const { data: paidUsers, isLoading } = useQuery({
    queryKey: ['unpaid-users'],
    queryFn: () => getUnpaidUsers(),
  });

  const form = useForm<MessageBody>({
    defaultValues: {
      dateTime: dayjs('2024-09-06T18:00:00'),
      location: '한양대학교 IT/BT관 508호',
      receivers: [],
      responseSchedule: dayjs('2024-09-04 17:00'),
      url: 'forms.gle/ecMLJ5fxTLFNZ52a6', //TODO: Change form link every semester
      studyName: '',
      templateCode: '',
    },
  });

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
        form.setValue(
          'templateCode',
          URGENT_MESSAGE_TEMPLATE_OPTIONS[0]!.value,
        );
        setTabValue(2);
        break;
      default:
        setTabValue(0);
    }
  };

  const handleSend = () => {
    openDualButtonDialog({
      dialogIconType: DialogIconType.CONFIRM,
      title: '문자 발송',
      message: `정규 스터디 합격 부원(총 ${paidUsers?.length}명)에게 문자를 발송해 말아?`,
      mainButtonText: '발송',
      mainButtonAction: async () => {
        // 문자 발송 로직
        const formData = form.getValues();
        const studyIds = paidUsers!.map((user) => user.study_id);
        for (const studyId of studyIds) {
          const { name: studyName } = await getStudyInfo(studyId.toString());
          const receivers = paidUsers
            ?.filter((paidUser) => paidUser.study_id === studyId)
            .map((val) => val.phone_number);
          await sendPassedRegularStudyMessage({
            dateTime: formData.dateTime,
            location: formData.location,
            receivers: receivers!,
            responseSchedule: formData.responseSchedule,
            studyName: studyName,
            templateCode: formData.templateCode,
            url: formData.url,
          });
        }

        closeDialog();
        openSingleButtonDialog({
          dialogIconType: DialogIconType.CONFIRM,
          title: '문자 발송 완료',
          message: '정규 스터디 합격자에게 문자를 발송했습니다.',
          mainButtonText: '확인',
        });
      },
      subButtonText: '취소',
      subButtonAction: closeDialog,
    });
  };

  return (
    <Layout>
      <Title title='문자 발송 서비스' label='문자 발송 서비스 관리' />
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
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSend}
                fullWidth
              >
                스터디 합격자에게 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={form.watch('templateCode')}
            users={paidUsers}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
      {/* 불합격 부원 대상 */}
      <TabPanel value={tabValue} index={1}>
        <Box>
          <Typography variant='titleMedium'>
            정규스터디 불합격자에게 문자 발송
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                placeholder='https://forms.gle/ecMLJ5fxTLFNZ52a6'
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
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSend}
                fullWidth
              >
                스터디 불합격자에게 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={REGULAR_STUDY_FAIL_TEMPLATE_CODE}
            users={paidUsers}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
      {/* 그 외 템플릿 */}
      <TabPanel value={tabValue} index={2}>
        <Box>
          <Typography variant='titleMedium'>
            그 외의 사유로 문자 발송
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
                placeholder='https://forms.gle/ecMLJ5fxTLFNZ52a6'
                label='구글폼 링크'
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
                options={URGENT_MESSAGE_TEMPLATE_OPTIONS}
                label='템플릿 종류 선택'
                sx={{
                  bgcolor: 'background.default',
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={handleSend}
                fullWidth
              >
                스터디 불합격자에게 발송
              </Button>
            </Grid>
          </Grid>
          <UserList
            templateCode={URGENT_TEMPLATE_CODE}
            users={paidUsers}
            isLoading={isLoading}
          />
        </Box>
      </TabPanel>
    </Layout>
  );
}

interface UserListProps<T extends PaidUser> {
  users: T[] | undefined;
  templateCode: string;
  isLoading: boolean;
  searchField?: keyof T; // Optional field to specify a search field
}

function UserList<T extends PaidUser>({
  users,
  isLoading,
  templateCode,
}: UserListProps<T>) {
  const [searchedUsers, setSearchedUsers] = useState<T[] | undefined>(users);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (users) {
      // Filter users based on the selected template code
      const filteredUsers = users.filter((user) => {
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[0]!.value) {
          return user.study_type === '정규 스터디';
        }
        if (templateCode === PASS_MESSAGE_TEMPLATE_OPTIONS[1]!.value) {
          return user.study_type === '자율 스터디';
        }
        return true;
      });

      setSearchedUsers(
        filteredUsers.filter(
          (user) =>
            user.name.includes(searchText) ||
            user.phone_number?.includes(searchText),
        ),
      );
    }
  }, [searchText, users, templateCode]);

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
        문자 발송 대상자 목록
      </Typography>
      <Input
        search
        placeholder='이름을 검색해보세요.'
        fullWidth
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <List>
        {searchedUsers?.map((user) => (
          <ListItem key={user.user_id}>
            <ListItemText primary={user.name} secondary={user.phone_number} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
