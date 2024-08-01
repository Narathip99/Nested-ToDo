// task
export interface SubTask {
  id: number;
  title: string;
  isComplete: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  tag: string;
  isComplete: boolean;
  subTask?: SubTask[];
}

// display
export interface DisplayTodosProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// filter
export interface ToolbarProps {
  filter: "All" | "Active" | "Completed";
  setFilter: React.Dispatch<
    React.SetStateAction<"All" | "Active" | "Completed">
  >;
  filteredTasks: {
    id: number;
    title: string;
    tag: string;
    isComplete: boolean;
  }[];
}
