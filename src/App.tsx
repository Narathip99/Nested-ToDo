import React, { useState, useEffect } from "react";

// components
import ToggleTheme from "./components/ToggleTheme";
import AddTodo from "./components/AddTodo";
import DisplayTodos from "./components/DisplayTodos";

// types
import { Task } from "./types/types";

// utils
import {
  loadTasksFromLocalStorage,
  saveTasksToLocalStorage,
  clearTasksFromLocalStorage,
} from "./utils/localStorage";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());

  // save tasks to local storage
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  // clear all tasks
  const clearAllTasks = () => {
    setTasks([]);
    clearTasksFromLocalStorage();
  };

  return (
    <div className="min-h-screen container">
      <header className="my-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todo List</h1>
        <ToggleTheme />
      </header>
      <AddTodo setTasks={setTasks} />
      <DisplayTodos
        tasks={tasks}
        setTasks={setTasks}
        clearAllTasks={clearAllTasks}
      />
    </div>
  );
};

export default App;
