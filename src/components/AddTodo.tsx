import React, { useState } from "react";
// types
import { Task } from "../types/types";
// components
import ModalTodo from "./ModalTodo";
import Search from "./Search";

interface AddTodoProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const AddTodo: React.FC<AddTodoProps> = ({ setTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditTask(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTodo = (task: Task) => {
    setTasks((prevTasks) => {
      if (editTask) {
        return prevTasks.map((t) => (t.id === task.id ? task : t));
      }
      return [...prevTasks, task];
    });
  };

  return (
    <section className="flex justify-between">
      <div className="flex justify-between items-center gap-4">
        <button className="btn" onClick={handleOpenModal}>
          Add Todo
        </button>
        <Search />
      </div>

      <ModalTodo
        isOpen={isModalOpen}
        mode={editTask ? "edit" : "add"}
        task={editTask || undefined}
        onClose={handleCloseModal}
        onSave={handleSaveTodo}
      />
    </section>
  );
};

export default AddTodo;
