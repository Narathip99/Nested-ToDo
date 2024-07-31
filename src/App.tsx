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
} from "./utils/localStorage";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage());

  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  return (
    <div className="min-h-screen container">
      <header className="my-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold">Todo List</h1>
        <ToggleTheme />
      </header>
      <AddTodo setTasks={setTasks} />
      <DisplayTodos tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
