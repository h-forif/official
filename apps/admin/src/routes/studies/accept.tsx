import { useState } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Typography } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowId,
} from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@packages/constants';
import {
  Application,
  acceptStudies,
  getApplications,
} from '@services/admin.service';
import { getMyStudyId } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import AcceptDialog from '@components/study/AcceptDialog';

export const Route = createFileRoute('/studies/accept')({
  loader: async () => {
    try {
      const ids = await getMyStudyId();

      const currentId = ids.find(
        (studyId) =>
          studyId.act_year === CURRENT_YEAR &&
          studyId.act_semester === CURRENT_SEMESTER,
      );
      return currentId;
    } catch (err) {
      console.error(err);
      alert('개최한 스터디가 없거나 스터디 정보를 불러오는데 실패했습니다.');
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: StudyAcceptPage,
});

function StudyAcceptPage() {
  const currentId = Route.useLoaderData();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: () => getApplications(currentId!),
  });

  const [application, setApplication] = useState<Application | null>(null);

  const { openSingleButtonDialog, openDualButtonDialog, closeDialog } =
    useDialogStore();

  const handleAccept = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '멘티 승인',
      message: '해당 멘티를 승인할까요? 이 결정은 취소할 수 없습니다.',
      mainButtonText: '승인',
      dialogIconType: DialogIconType.CONFIRM,
      mainButtonAction: async () => {
        try {
          await acceptStudies([Number(id)], currentId!.id);
          closeDialog();
          queryClient.invalidateQueries({
            queryKey: ['applications'],
          });
          openSingleButtonDialog({
            title: `해당 멘티가 승인되었습니다.`,
            message: `해당 멘티(${application?.user_id} ${application?.name})가 승인되었습니다. "내 스터디 관리"에서 해당 멘티가 성공적으로 추가되었는지 확인해주세요.`,
            mainButtonText: '확인',
            dialogIconType: DialogIconType.CONFIRM,
          });
        } catch (e) {
          console.error(`Failed to approve member with ID ${id}:`, e);
        }
      },
      subButtonText: '취소',
    });
  };

  const handlePrimaryRowClick: GridEventListener<'rowClick'> = (params) => {
    const application = applications!.first.find(
      (application) => application.user_id === params.id,
    );
    setApplication(application!);
  };

  const handleSecondaryRowClick: GridEventListener<'rowClick'> = (params) => {
    const application = applications!.second.find(
      (application) => application.user_id === params.id,
    );
    setApplication(application!);
  };

  const columns: GridColDef<Application>[] = [
    { field: 'user_id', headerName: '학번', flex: 1 },
    { field: 'name', headerName: '이름', flex: 1 },
    {
      field: 'intro',
      headerName: '자기소개',
      flex: 3,
    },
    {
      field: 'phone_number',
      headerName: '전화번호',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '승인',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<CheckCircleOutlineOutlinedIcon />}
            label='Save'
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handleAccept(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Title
        title='스터디 승인'
        label='매 학기 시작 전 스터디 관리팀과 회장단은 멘토의 스터디를 승인해야 합니다.'
      />
      <Layout>
        <Typography variant='titleSmall'>1순위 스터디 신청 목록</Typography>
        <Typography variant='bodySmall'>
          멘토님의 스터디를 1순위로 신청한 부원 목록입니다. 2순위 신청 부원은
          1순위 신청 부원을 모두 승인하고도 멘토 님이 생각한 인원보다 부족한
          경우에 승인하여 주세요.
        </Typography>
        <Box sx={{ width: '100%', my: 4 }}>
          <Table
            loading={isLoading}
            rows={applications?.first}
            autoHeight
            columns={columns}
            onRowClick={(params, event, details) => {
              handlePrimaryRowClick(params, event, details);
              handleOpen();
            }}
            getRowId={(row) => row.user_id}
          />
        </Box>
        <Typography variant='titleSmall'>2순위 스터디 신청 목록</Typography>
        <Typography variant='bodySmall'>
          멘토님의 스터디를 2순위로 신청한 부원 목록입니다. 2순위 신청 부원은
          1순위 신청 부원을 모두 승인하고도 멘토 님이 생각한 인원보다 부족한
          경우에 승인하여 주세요.
        </Typography>
        <Box sx={{ width: '100%', my: 4 }}>
          <Table
            loading={isLoading}
            rows={applications?.second}
            columns={columns}
            autoHeight
            onRowClick={(params, event, details) => {
              handleSecondaryRowClick(params, event, details);
              handleOpen();
            }}
            getRowId={(row) => row.user_id}
          />
        </Box>
      </Layout>
      <AcceptDialog
        handleClose={handleClose}
        open={open}
        application={application}
        key={application?.user_id}
        user_id={application?.user_id}
        studyId={currentId!.id}
      />
    </Box>
  );
}
