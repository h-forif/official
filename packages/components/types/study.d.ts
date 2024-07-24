export interface Study {
  id: number;
  name: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  explanation: string;
  level: number;
  weekDay: number;
  image?: string;
  studyStatus: string;
}
