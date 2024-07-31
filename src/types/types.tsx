export interface Task {
  id: number;
  title: string;
  description: string;
  tag: string;
  isComplete: boolean;
  subTask: SubTask[];
}

export interface SubTask {
  id: number;
  title: string;
  isComplete: boolean;
}
