import React, { useState } from "react";

// types
import { Task, DisplayTodosProps } from "../types/types";

// icons
import { ChevronDown, ChevronUp, SquarePen, Trash } from "lucide-react";

// components
import ModalTodo from "./ModalTodo";
import Toolbar from "./Toolbar";

const DisplayTodos: React.FC<DisplayTodosProps> = ({ tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"All" | "Active" | "Completed">("All");
  const [expandSubTasks, setExpandSubTasks] = useState<number[]>([]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };

  // edit btn
  const handleEdit = (task: Task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  // delete btn
  const handleDelete = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // save new task or update edit
  const handleSaveTodo = (task: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
    handleCloseModal();
  };

  // filtered task for display
  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "All":
        return true;
      case "Active":
        return !task.isComplete;
      case "Completed":
        return task.isComplete;
      default:
        return true;
    }
  });

  // handle expand subtasks
  const toggleExpandSubTasks = (taskId: number) => {
    if (expandSubTasks.includes(taskId)) {
      setExpandSubTasks(expandSubTasks.filter((id) => id !== taskId));
    } else {
      setExpandSubTasks([...expandSubTasks, taskId]);
    }
  };

  // handle checkbox change for main tasks
  const handleTaskCheckboxChange = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  return (
    <section className="grid gap-4 my-4 p-8 w-full bg-base-200 dark:bg-base-300 rounded-lg shadow-lg">
      <Toolbar
        filter={filter}
        setFilter={setFilter}
        filteredTasks={filteredTasks}
      />

      {tasks.length === 0 ? (
        <div className="py-32 flex flex-col gap-2 justify-center items-center">
          <h1 className="text-3xl font-semibold">
            {" "}
            There's nothing to do yet,{" "}
          </h1>
          <h1 className="text-4xl font-bold">so add something to do now.</h1>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 flex flex-col bg-white dark:bg-base-100 rounded-lg"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.isComplete}
                  onChange={() => handleTaskCheckboxChange(task.id)}
                />
                <div>
                  <p className="text-xl font-medium">{task.title}</p>
                  <p>{task.tag}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {task.subTask && task.subTask.length > 0 && (
                  <button
                    className="btn btn-square"
                    onClick={() => toggleExpandSubTasks(task.id)}
                  >
                    {expandSubTasks.includes(task.id) ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </button>
                )}
                <button
                  className="btn btn-square hover:bg-orange-500"
                  onClick={() => handleEdit(task)}
                >
                  <SquarePen className="hover:text-white" />
                </button>
                <button
                  className="btn btn-square hover:bg-red-500"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash className="hover:text-white" />
                </button>
              </div>
            </div>
            {expandSubTasks.includes(task.id) &&
              task.subTask &&
              task.subTask.length > 0 && (
                <div className="mt-4 ml-8">
                  {task.subTask.map((subTask) => (
                    <div
                      key={subTask.id}
                      className="flex justify-between items-center mb-2 p-2 bg-gray-100 dark:bg-base-200 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-lg">{subTask.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))
      )}

      {editTask && (
        <ModalTodo
          isOpen={isModalOpen}
          mode="edit"
          task={editTask}
          onClose={handleCloseModal}
          onSave={handleSaveTodo}
        />
      )}
    </section>
  );
};

export default DisplayTodos;
