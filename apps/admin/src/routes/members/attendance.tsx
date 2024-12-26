import { useMemo } from 'react';

import { Checkbox, Container, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { Table } from '@packages/components/table/Table';
import { User } from '@packages/components/types/user';
import { getMentees } from '@services/admin.service';
import { getAttendance } from '@services/attendance.service';
import { getAllStudies } from '@services/study.service';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getCurrentTerm } from '@utils/getCurrentTerm';

interface WeekAttendance {
  [key: string]: boolean;
}
type UserWithAttendance = User & WeekAttendance & { count: number };

export const Route = createFileRoute('/members/attendance')({
  loader: async () => {
    const currentTerm = getCurrentTerm();
    try {
      const studies = await getAllStudies({
        year: Number(currentTerm.year),
        semester: Number(currentTerm.semester),
      });

      const studyIds = studies.map((study) => study.id);
      return { studyIds, studies };
    } catch (err) {
      console.error(err);
      alert('스터디 정보를 불러오는데 실패했습니다.');
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: () => <AttendancePage />,
});

function AttendancePage() {
  const { studyIds, studies } = Route.useLoaderData();

  // Fetch attendance for each study
  const attendanceQueries = useQueries({
    queries: studyIds.map((studyId) => ({
      queryKey: ['attendances', studyId],
      queryFn: () => getAttendance(studyId),
    })),
  });

  // Fetch mentees for each study and include studyId
  const menteeQueries = useQueries({
    queries: studyIds.map((studyId) => ({
      queryKey: ['mentees', studyId],
      queryFn: () => getMentees(studyId),
    })),
  });

  const allAttendances = attendanceQueries.flatMap((query) => query.data || []);
  const allMentees = menteeQueries.flatMap((query, index) => {
    const studyId = studyIds[index]; // Map studyId to each mentee
    return (query.data || []).map((mentee) => ({
      ...mentee,
      study_id: studyId,
    }));
  });

  // Map mentees to attendance with study name
  const menteesWithAttendance = allMentees.map((mentee) => {
    const menteeAttendance = allAttendances.filter(
      (att) => att.mentee_phone_number === mentee.phone_number,
    );

    const attendanceRecord = Array.from({ length: 8 }).reduce(
      (acc: Record<string, boolean>, _, index) => {
        const weekAttendance = menteeAttendance.find(
          (att) => att.week_num === index + 1,
        );
        acc[`week_${index + 1}`] = weekAttendance
          ? weekAttendance.attendance_status === '출석'
          : false;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    const study = studies.find((study) => study.id === mentee.study_id);

    return {
      ...mentee,
      ...attendanceRecord,
      count: menteeAttendance.filter((att) => att.attendance_status === '출석')
        .length,
      studyName: study ? study.name : 'Unknown',
    };
  });

  const generateWeekColumns = (
    weekCount: number,
  ): GridColDef<UserWithAttendance>[] => {
    const weekColumns: GridColDef<UserWithAttendance>[] = Array.from(
      { length: weekCount },
      (_, index) => ({
        field: `week_${index + 1}`,
        headerName: `${index + 1}주차`,
        flex: 1,
        renderCell: (
          params: GridRenderCellParams<UserWithAttendance, boolean>,
        ) => {
          const userId = params.row.id;

          if (!userId) return null;

          const checked = params.value === true;

          return <Checkbox checked={checked} />;
        },
      }),
    );

    return weekColumns;
  };

  const columns: GridColDef<UserWithAttendance>[] = [
    {
      field: 'studyName',
      headerName: '스터디 이름',
      width: 160,
    },
    { field: 'id', headerName: '학번', width: 160 },
    {
      field: 'name',
      headerName: '이름',
      width: 120,
    },
    {
      field: 'department',
      headerName: '학과',
      width: 120,
    },
    ...generateWeekColumns(8),
    {
      field: 'count',
      headerName: '누적 출석 수',
      type: 'number',
      width: 110,
      editable: true,
      valueGetter: (params: number) => `${params}(${(params / 8) * 100}%)`,
    },
  ];

  const rows = useMemo(() => menteesWithAttendance, [menteesWithAttendance]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant='displaySmall'>
        Attendance Records for Current Term
      </Typography>
      <Typography variant='bodyMedium' gutterBottom>
        View and manage attendance across all studies in the current term.
      </Typography>
      <Table
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 40,
            },
          },
        }}
        pageSizeOptions={[
          10,
          20,
          40,
          { label: 'Half', value: rows.length / 2 },
        ]}
      />
    </Container>
  );
}
