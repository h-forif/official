export interface Study {
  studyId: number;
  studyName: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  explanation: string;
  level: number;
  weekDay: number;
  interview: boolean;
  image?: string;
  studyType: string;
  studyStatus: string;
}
