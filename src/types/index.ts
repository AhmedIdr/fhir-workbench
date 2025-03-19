export type Task = 'qna' | 'api_qna' | 'identification' | 'generation';
export type ModelSize = '7' | '14' | '32' | '70' | '671' | '>70' | 'Closed';

export interface Model {
  name: string;
  huggingface: string;
  size: ModelSize;
  tasks: Record<Task, number | null>;
}

export interface SortConfig {
  key: Task | null;
  direction: 'asc' | 'desc';
}