import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { Study } from '@packages/components/types/study';
import { getAllStudies } from '@services/study.service';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/studies/')({
  loader: async () => {
    const allStudies = [];
    for (let year = 2018; year <= 2024; year++) {
      for (let semester = 1; semester <= 2; semester++) {
        const studies = await getAllStudies({ year, semester });
        allStudies.push(...studies);
      }
    }
    return allStudies;
  },
  component: StudiesPage,
});

const columns: GridColDef<Study>[] = [
  { field: 'id', headerName: '아이디', flex: 1 },
  { field: 'name', headerName: '스터디 이름', flex: 2 },
  { field: 'primary_mentor_name', headerName: '1순위 멘토', flex: 1 },
  { field: 'act_year', headerName: '년도', flex: 1 },
  { field: 'act_semester', headerName: '학기', flex: 1 },
];

function StudiesPage() {
  const rows = Route.useLoaderData();

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
    </Box>
  );
}
