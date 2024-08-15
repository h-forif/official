import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { User } from '@packages/components/types/user';
import { getAllUsers } from '@services/admin.service';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/members/')({
  loader: async () => getAllUsers(),
  component: MembersPage,
});

const columns: GridColDef<User>[] = [
  { field: 'id', headerName: '학번', flex: 2 },
  { field: 'name', headerName: '이름', flex: 1 },
  { field: 'department', headerName: '학과', flex: 2 },
  { field: 'phone_number', headerName: '전화번호', flex: 2 },
  { field: 'email', headerName: '이메일', flex: 2 },
];

function MembersPage() {
  const users = Route.useLoaderData();
  return (
    <Box>
      <Title
        title='부원 목록'
        label='현재 홈페이지에 가입한 부원 목록을 볼 수 있습니다.'
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
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
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
    </Box>
  );
}
