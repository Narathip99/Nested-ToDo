import React, { useState } from "react";
import { Search } from "lucide-react";
import ModalTodo from "./ModalTodo";
import { Task } from "../types/types";

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
      <select className="select select-bordered">
        <option disabled selected>
          All
        </option>
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
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
