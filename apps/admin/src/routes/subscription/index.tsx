import { useState } from 'react';

import DoneAllIcon from '@mui/icons-material/DoneAll';
import UndoIcon from '@mui/icons-material/Undo';
import { Box, Typography } from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowSelectionModel,
} from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import {
  PaidUser,
  changePaidStatus,
  getPaidUsers,
  getUnpaidUsers,
} from '@services/pay.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/subscription/')({
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const queryClient = useQueryClient();
  const {
    data: unPaidUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['unpaid-users'],
    queryFn: () => getUnpaidUsers(),
  });

  const {
    data: paidUsers,
    isLoading: isPaidLoading,
    error: paidError,
  } = useQuery({
    queryKey: ['paid-users'],
    queryFn: () => getPaidUsers(),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>(
    [],
  );

  const { openSingleButtonDialog } = useDialogStore();
  if (error || paidError) {
    console.error(error), console.error(paidError);
  }

  const handlePaid = async (id: GridRowId) => {
    console.log('납부');
    try {
      await changePaidStatus([id as number], 'Y');
      queryClient.invalidateQueries({
        queryKey: ['unpaid-users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['paid-users'],
      });
      openSingleButtonDialog({
        title: '납부 완료',
        message: '납부가 완료되었습니다.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.CONFIRM,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUndo = async (id: GridRowId) => {
    try {
      await changePaidStatus([id as number], 'N');
      queryClient.invalidateQueries({
        queryKey: ['unpaid-users'],
      });
      queryClient.invalidateQueries({
        queryKey: ['paid-users'],
      });
      openSingleButtonDialog({
        title: '납부 취소 완료',
        message: '납부 취소가 완료되었습니다.',
        mainButtonText: '확인',
        dialogIconType: DialogIconType.CONFIRM,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const columns: GridColDef<PaidUser>[] = [
    { field: 'user_id', headerName: '학번', flex: 2 },
    { field: 'name', headerName: '이름', flex: 1 },
    {
      field: 'phone_number',
      headerName: '전화번호',
      flex: 2,
      valueFormatter: (params: string) =>
        params.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '납부',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DoneAllIcon />}
            label='done'
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handlePaid(id)}
          />,
        ];
      },
    },
  ];

  const doneColumns: GridColDef<PaidUser>[] = [
    { field: 'user_id', headerName: '학번', flex: 2 },
    { field: 'name', headerName: '이름', flex: 1 },
    { field: 'phone_number', headerName: '전화번호', flex: 2 },
    {
      field: 'actions',
      type: 'actions',
      headerName: '미납',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<UndoIcon />}
            label='undo'
            sx={{
              color: 'error.main',
            }}
            onClick={() => handleUndo(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Title title='회비' label='회비 내역을 확인하세요.' />
      <Layout>
        <Typography variant='titleSmall'>회비 미납부 목록</Typography>
        <Typography variant='bodySmall'>
          스터디를 신청한 부원들 중 회비를 납부하지 않은 부원 목록입니다. 납부를
          완료했다면 오른쪽의 납부 버튼을 눌러주세요.
        </Typography>
        <Table
          columns={columns}
          rows={unPaidUsers}
          loading={isLoading}
          getRowId={(row) => row.user_id}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) => {
            setSelectionModel(selectionModel);
          }}
          sx={{
            my: 2,
          }}
        />
        <Typography variant='titleSmall'>회비 납부 목록</Typography>
        <Typography variant='bodySmall'>
          스터디를 신청한 부원들 중 회비를 납부한 부원 목록입니다. 납부를
          완료하지 않았다면 오른쪽의 미납부 버튼을 눌러주세요.
        </Typography>
        <Table
          columns={doneColumns}
          rows={paidUsers}
          loading={isPaidLoading}
          getRowId={(row) => row.user_id}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) => {
            setSelectionModel(selectionModel);
          }}
          sx={{
            my: 2,
          }}
        />
      </Layout>
    </Box>
  );
}
