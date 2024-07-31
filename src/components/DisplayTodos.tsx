import React, { useState } from "react";
// icons
import { SquarePen, Trash } from "lucide-react";
import ModalTodo from "./ModalTodo";
import { Task } from "../types/types";

interface DisplayTodosProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const DisplayTodos: React.FC<DisplayTodosProps> = ({ tasks, setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };

  const handleSaveTodo = (task: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === task.id ? task : t))
    );
    handleCloseModal();
  };

  return (
    <div className="grid gap-4 my-4 p-8 w-full bg-base-200 dark:bg-base-300 rounded-lg">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 flex justify-between items-center bg-white dark:bg-base-100 rounded-lg "
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              className="checkbox"
              checked={task.isComplete}
              onChange={() =>
                setTasks((prevTasks) =>
                  prevTasks.map((t) =>
                    t.id === task.id ? { ...t, isComplete: !t.isComplete } : t
                  )
                )
              }
            />
            <div>
              <p className="text-xl font-medium">{task.title}</p>
              <p>{task.tag}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
      ))}
      {editTask && (
        <ModalTodo
          isOpen={isModalOpen}
          mode="edit"
          task={editTask}
          onClose={handleCloseModal}
          onSave={handleSaveTodo}
        />
      )}
    </div>
  );
};

export default DisplayTodos;
