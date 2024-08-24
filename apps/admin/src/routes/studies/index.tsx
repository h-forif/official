import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, Typography } from '@mui/material';
import { GridActionsCellItem, GridColDef, GridRowId } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { Study } from '@packages/components/types/study';
import { deleteStudy, getAllStudies } from '@services/study.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/studies/')({
  component: StudiesPage,
});

function StudiesPage() {
  const queryClient = useQueryClient();
  const { openDualButtonDialog, openSingleButtonDialog, closeDialog } =
    useDialogStore();

  const handleDeleteStudy = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '스터디 삭제',
      message:
        '스터디를 삭제하시겠습니까? 2024학년도 2학기 이전 스터디는 신청서 기록이 남아있지 않기에 복구할 수 없습니다.',
      dialogIconType: DialogIconType.WARNING,
      mainButtonText: '확인',
      mainButtonAction: async () => {
        try {
          await deleteStudy(id.toString());
          queryClient.invalidateQueries({
            queryKey: ['studies'],
          });
          closeDialog();
          openSingleButtonDialog({
            dialogIconType: DialogIconType.CONFIRM,
            title: '스터디 삭제 성공',
            message: '스터디가 성공적으로 삭제되었습니다.',
            mainButtonText: '확인',
          });
        } catch (err) {
          console.error(err);
        }
      },
      subButtonText: '취소',
      subButtonAction: () => {
        closeDialog();
      },
    });
  };

  const columns: GridColDef<Study>[] = [
    { field: 'id', headerName: '아이디', flex: 1 },
    { field: 'name', headerName: '스터디 이름', flex: 2 },
    { field: 'primary_mentor_name', headerName: '1순위 멘토', flex: 1 },
    {
      field: 'year_semester',
      headerName: '활동 학기',
      flex: 1,
      valueGetter: (value, row) => {
        return `${row.act_year}-${row.act_semester}`;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '삭제',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteOutlineIcon />}
            label='Delete'
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handleDeleteStudy(id)}
          />,
        ];
      },
    },
  ];

  const queryConfigs = [];

  for (let year = 2018; year <= 2024; year++) {
    for (let semester = 1; semester <= 2; semester++) {
      queryConfigs.push({
        queryKey: ['studies', year, semester],
        queryFn: () => getAllStudies({ year, semester }),
        staleTime: 1000 * 60 * 10,
      });
    }
  }

  const queries = useQueries({ queries: queryConfigs });

  const isLoading = queries.some((query) => query.isLoading);
  const studies = queries.flatMap((query) => query.data ?? []);

  return (
    <Box>
      <Title
        title='역대 스터디 목록'
        label='2018년 1학기부터 2024년 2학기까지의 스터디 정보입니다.'
      />
      <Layout>
        <Typography variant='titleSmall'>
          승인되었던 스터디 목록입니다.
        </Typography>
        <Typography variant='bodySmall'>
          각 스터디를 클릭하여 부족한 정보가 없는지 확인하고 승인버튼을
          클릭해주세요.
        </Typography>
        <Box sx={{ height: 640, width: '100%', mt: 2 }}>
          <Table
            loading={isLoading}
            rows={studies}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
              sorting: {
                sortModel: [{ field: 'id', sort: 'desc' }],
              },
            }}
          />
        </Box>
      </Layout>
    </Box>
  );
}
