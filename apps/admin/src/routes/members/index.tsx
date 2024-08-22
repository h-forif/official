import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { User } from '@packages/components/types/user';
import { getAllUsers } from '@services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/members/')({
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
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
  });

  if (error) {
    console.error(error);
  }
  return (
    <Box>
      <Title
        title='부원 목록'
        label='현재 홈페이지에 가입한 부원 목록을 볼 수 있습니다.'
      />
      <Layout>
        <Box
          sx={{
            height: 640,
            width: '100%',
            mt: 2,
            bgcolor: 'background.default',
          }}
        >
          <Table rows={data} loading={isLoading} columns={columns} />
        </Box>
      </Layout>
    </Box>
  );
}
