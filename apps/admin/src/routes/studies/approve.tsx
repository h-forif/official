import { useState } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowId,
  GridToolbar,
} from '@mui/x-data-grid';

import { MentorApplication, getAppliedStudies } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import ApplicationDialog from '@components/study/ApplicationDialog';

interface Plan {
  section: string;
  content: string;
}

export interface ApprovedApplication
  extends Omit<MentorApplication, 'study_apply_plans'> {
  study_apply_plans: Plan[];
  primary_mentor_email: string;
  primary_mentor_phone_number: string;
  secondary_mentor_email?: string;
  secondary_mentor_phone_number?: string;
}

export const Route = createFileRoute('/studies/approve')({
  loader: () => getAppliedStudies(),
  component: StudiesPage,
});

function StudiesPage() {
  const initialRows: ApprovedApplication[] = Route.useLoaderData();
  const [rows, setRows] = useState<ApprovedApplication[]>(initialRows);
  const [application, setApplication] = useState<ApprovedApplication>(rows[0]!);
  const [open, setOpen] = useState(false);
  const { openDualButtonDialog } = useDialogStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    const application = rows.find(
      (application) => application.id === params.id,
    );
    setApplication(application!);
  };

  const handleApprove = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '스터디 승인',
      message:
        '해당 스터디를 승인할까요? 승인하는 즉시 부원들에게 노출되는 스터디 페이지로 이동합니다.',
      mainButtonText: '승인',
      dialogIconType: DialogIconType.CONFIRM,
      mainButtonAction: async () => {
        try {
          // await approveStudies([Number(id)]);
          console.log(`Study with ID ${id} approved`);
          setRows((prevRows) => prevRows.filter((row) => row.id !== id));
          alert(
            '해당 스터디가 승인되었습니다. "스터디 목록"에서 해당 스터디가 성공적으로 추가되었는지 확인해주세요.',
          );
        } catch (e) {
          console.error(`Failed to approve study with ID ${id}:`, e);
        }
      },
      subButtonText: '취소',
      subButtonAction: () => {
        console.log('Canceled');
      },
    });
  };

  const columns: GridColDef<ApprovedApplication>[] = [
    { field: 'name', headerName: '스터디 이름', flex: 2 },
    { field: 'primary_mentor_name', headerName: '멘토1', flex: 1 },
    {
      field: 'secondary_mentor_name',
      headerName: '멘토2',
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
            onClick={() => handleApprove(id)}
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
        <Typography variant='titleSmall'>
          승인 대기 중인 스터디 목록입니다.
        </Typography>
        <Typography variant='bodySmall'>
          각 스터디를 클릭하여 부족한 정보가 없는지 확인하고 승인버튼을
          클릭해주세요.
        </Typography>
        <Box sx={{ height: 640, width: '100%', mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            onRowClick={(params, event, details) => {
              handleRowClick(params, event, details);
              handleClickOpen();
            }}
            disableRowSelectionOnClick
            pageSizeOptions={[10]}
            checkboxSelection
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
          />
        </Box>
      </Layout>
      <ApplicationDialog
        id={application.id}
        key={application.id}
        open={open}
        handleClose={handleClose}
        application={application}
      />
    </Box>
  );
}
