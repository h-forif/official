import { Box } from '@mui/material';

import styled from '@emotion/styled';
import koLocales from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { Layout } from '@packages/components/elements/Layout';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { createFileRoute } from '@tanstack/react-router';

import { Title } from '@components/Title';

export const Route = createFileRoute('/club/calendar')({
  component: CalendarPage,
});

const GOOGLE_CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;

function CalendarPage() {
  const { closeDialog, openSingleButtonDialog } = useDialogStore();
  const handleDateClick = (arg: DateClickArg) => {
    openSingleButtonDialog({
      title: '오늘의 날짜는?',
      mainButtonAction: () => {
        closeDialog();
      },
      dialogIconType: DialogIconType.CONFIRM,
      mainButtonText: '확인',
      message: `${arg.dateStr} 날짜를 클릭하셨습니다.`,
    });
  };

  return (
    <Box>
      <Title
        title='캘린더'
        label='포리프의 한 학기 행사를 한 눈에 확인할 수 있습니다.'
      />
      <Layout>
        <FullCalendarContainer>
          <FullCalendar
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next dayGridMonth listWeek',
            }}
            locale={koLocales}
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              googleCalendarPlugin,
              listPlugin,
            ]}
            googleCalendarApiKey={GOOGLE_CALENDAR_API_KEY}
            events={{
              googleCalendarId: 'contact@forif.org',
              className: 'calendar-event',
            }}
            dateClick={handleDateClick}
            initialView='dayGridMonth'
          />
        </FullCalendarContainer>
      </Layout>
    </Box>
  );
}

const FullCalendarContainer = styled.div`
  .fc .fc-button-primary {
    background-color: #1d40ba;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: #c5cbf2;
  }

  .fc .fc-scrollgrid {
    border-radius: 8px;
  }

  .calendar-event {
    background-color: #1d40ba;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
  }

  .calendar-event:hover {
    background-color: #2f52d1;
  }
`;
