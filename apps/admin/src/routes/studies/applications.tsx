import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { AllApplication, getAllApplications } from '@services/admin.service';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/studies/applications')({
  component: ApplicationsPage,
});

const columns: GridColDef<AllApplication>[] = [
  { field: 'applier_id', headerName: '학번', width: 90 },
  { field: 'study_id', headerName: '스터디 ID', width: 150 },
  { field: 'status', headerName: '상태', width: 150 },
  { field: 'created_at', headerName: '생성일', width: 150 },
  { field: 'updated_at', headerName: '수정일', width: 150 },
];

function ApplicationsPage() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['all-applications'],
    queryFn: () => getAllApplications(),
  });

  console.log(applications);

  return (
    <Box>
      <Title
        title='스터디 신청서 관리'
        label='모든 스터디 신청서를 관리합니다.'
      />
      <Layout>
        <Table
          loading={isLoading}
          columns={columns}
          rows={applications}
          getRowId={(row: AllApplication) => row.applier_id}
        />
      </Layout>
    </Box>
  );
}
