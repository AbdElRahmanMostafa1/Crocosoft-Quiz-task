export interface Answer {
  id: number;
  is_true: boolean;
  text: string;
}

export interface QuestionAndAnswers {
  id: number;
  text: string;
  feedback_false: string;
  feedback_true: string;
  answers: Answer[];
}
