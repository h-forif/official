import { useMemo, useState } from 'react';

import { Checkbox, Stack } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { Button } from '@packages/components/Button';
import { Table } from '@packages/components/table/Table';
import { User } from '@packages/components/types/user';
import { Attend, getAttendance } from '@services/attendance.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface WeekAttendance {
  [key: string]: boolean;
}

type UserWithAttendance = User & WeekAttendance & { count: number };

interface AttendanceTabProps {
  mentees: User[] | undefined;
  isLoading: boolean;
  studyId: number;
}

export function AttendanceTab({
  mentees,
  isLoading,
  studyId,
}: AttendanceTabProps) {
  const queryClient = useQueryClient();
  const { openSingleButtonDialog } = useDialogStore();
  const { data: attendances, isLoading: isAttendancesLoading } = useQuery({
    queryKey: ['attendances', studyId],
    queryFn: () => getAttendance(studyId),
  });

  const [editedAttendance, setEditedAttendance] = useState<
    Record<string, Record<number, boolean>>
  >({});

  const handleAttendanceChange = (
    userId: string,
    weekNum: number,
    checked: boolean,
  ) => {
    setEditedAttendance((prevState) => ({
      ...prevState,
      [userId]: {
        ...(prevState[userId] || {}),
        [weekNum]: checked,
      },
    }));
  };

  const handleSaveAll = async () => {
    const promises = Object.keys(editedAttendance).flatMap((userId) =>
      Object.entries(editedAttendance[userId]!).map(([weekNum, attendance]) => {
        const attendanceStatus = attendance ? '출석' : '결석';
        return Attend({
          studyId,
          userId: Number(userId),
          weekNum: Number(weekNum),
          attendanceStatus,
        });
      }),
    );

    try {
      await Promise.all(promises);
      openSingleButtonDialog({
        title: '출석 정보 저장 완료',
        message: '모든 출석 정보가 성공적으로 저장되었습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
    } catch (error) {
      console.error('Failed to save attendance', error);
      openSingleButtonDialog({
        title: '출석 정보 저장 실패',
        message:
          '출석 정보 저장에 실패했습니다. 개발자 도구(F12)를 통해 나타나는 오류를 개발자에게 전달해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  // this function will be used in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSaveWeek = async (weekNum: number) => {
    const promises = Object.keys(editedAttendance)
      .map((userId) => {
        const attendance = editedAttendance[userId]?.[weekNum];
        if (attendance !== undefined) {
          const attendanceStatus = attendance ? '출석' : '결석';
          return Attend({
            studyId,
            userId: Number(userId),
            weekNum,
            attendanceStatus,
          });
        }
        return null;
      })
      .filter(Boolean);

    try {
      await Promise.all(promises);
      queryClient.invalidateQueries({
        queryKey: ['attendances', studyId],
      });
      alert(`Attendance for week ${weekNum} saved.`);
    } catch (error) {
      console.error('Failed to save attendance', error);
    }
  };

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
          const weekNum = index + 1;
          const userId = params.row.id;

          if (!userId) return null;

          const checked =
            editedAttendance[userId!]?.[weekNum] !== undefined
              ? editedAttendance[userId!]![weekNum]
              : params.value === true;

          return (
            <Checkbox
              checked={checked}
              onChange={(e) =>
                handleAttendanceChange(userId!, weekNum, e.target.checked)
              }
            />
          );
        },
      }),
    );

    return weekColumns;
  };

  const columns: GridColDef<UserWithAttendance>[] = [
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

  const rows = useMemo(() => {
    if (!mentees || !attendances) return [];
    return mentees.map((mentee) => {
      const menteeAttendance = attendances.filter(
        (attendance) => attendance.mentee_phone_number === mentee.phone_number,
      );

      const attendanceRecord: WeekAttendance = Array.from({ length: 8 }).reduce(
        (acc: WeekAttendance, _, index) => {
          // Ensure that all week fields are initialized (default to false if missing)
          const attendance = menteeAttendance.find(
            (att) => att.week_num === index + 1,
          );
          acc[`week_${index + 1}`] = attendance
            ? attendance.attendance_status === '출석'
            : false;
          return acc;
        },
        {} as WeekAttendance,
      );

      return {
        ...mentee,
        ...attendanceRecord,
        count: menteeAttendance.filter(
          (att) => att.attendance_status === '출석',
        ).length,
      } as UserWithAttendance;
    });
  }, [mentees, attendances]);

  return (
    <Stack>
      <Stack direction='row' justifyContent={'space-between'} mb={2}>
        <Button variant='contained' onClick={handleSaveAll}>
          전체 저장
        </Button>
      </Stack>
      <Table
        columns={columns}
        rows={rows}
        loading={isLoading || isAttendancesLoading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 40,
            },
          },
        }}
        pageSizeOptions={[40]}
      />
    </Stack>
  );
}
