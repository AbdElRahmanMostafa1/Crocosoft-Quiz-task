import { QuestionAndAnswers } from "./QuestionAndAnswers";

export interface Quiz {
  id: number;
  title: string;
  description: string;
  url: string;
  created: string;
  modified: string;
  questions_answers: QuestionAndAnswers[];
  score: number | null;
}
