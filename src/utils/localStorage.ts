import { Task } from "../types/types";

// load tasks from local storage
export const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// save tasks to local storage
export const saveTasksToLocalStorage = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// clear all tasks from local storage
export const clearTasksFromLocalStorage = (): void => {
  localStorage.removeItem("tasks");
};
