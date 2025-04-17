// src/types/index.ts

export type QuestionType = 'short' | 'long' | 'number' | 'radio';

export interface Poll {
  id: string;
  question: string;
  options: string[];
  responses: number[]; // Count per option
}

export interface FormQuestion {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[]; // For radio
}

export interface Form {
  id: string;
  title: string;
  questions: FormQuestion[];
  responses: Record<string, string | number>[];
}
