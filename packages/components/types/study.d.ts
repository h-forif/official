export interface Study {
  id: number;
  name: string;
  primary_mentor_name: string;
  secondary_mentor_name: string;
  start_time: string;
  end_time: string;
  difficulty: number;
  explanation: string;
  week_day: number;
  image: string;
  location: string;
  tag: string;
  study_plans: StudyPlan[];
  one_liner: string;
  act_year: number;
  act_semester: number;
}

export interface StudyPlan {
  section: string;
  content: string[];
}
