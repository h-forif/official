import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { PaidUser, getUnpaidUsers } from '@services/pay.service';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/subscription/')({
  component: SubscriptionPage,
});

const columns: GridColDef<PaidUser>[] = [
  { field: 'user_id', headerName: '학번', flex: 2 },
  { field: 'name', headerName: '이름', flex: 1 },
  { field: 'phone_number', headerName: '전화번호', flex: 2 },
  { field: 'primary_study_id', headerName: '1순위 스터디', flex: 2 },
  { field: 'secondary_study_id', headerName: '2순위 스터디', flex: 2 },
];

function SubscriptionPage() {
  const {
    data: unPaidUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['unpaid-users'],
    queryFn: () => getUnpaidUsers(),
  });

  if (error) {
    console.error(error);
  }

  return (
    <Box>
      <Title title='회비 내역' label='회비 내역을 알려주세요.' />
      <Layout>
        <Table
          columns={columns}
          rows={unPaidUsers}
          loading={isLoading}
          getRowId={(row) => row.user_id}
        />
      </Layout>
    </Box>
  );
}
