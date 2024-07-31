import React, { useState, useEffect } from "react";
import { Plus, SquarePen, Trash } from "lucide-react";
import { Task } from "../types/types";

interface ModalTodoProps {
  isOpen: boolean;
  mode: "add" | "edit";
  task?: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const ModalTodo: React.FC<ModalTodoProps> = ({
  isOpen,
  mode,
  task,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState<
    { title: string; isComplete: boolean }[]
  >([]);

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setTag(task.tag);
      setSubTasks(task.subTask);
    }
  }, [mode, task]);

  const handleAddSubTask = () => {
    if (subTask) {
      setSubTasks([...subTasks, { title: subTask, isComplete: false }]);
      setSubTask("");
    }
  };

  const handleSave = () => {
    if (title && description) {
      const newTask: Task = {
        id: mode === "add" ? Date.now() : task!.id,
        title,
        description,
        tag,
        isComplete: mode === "edit" ? task!.isComplete : false,
        subTask: subTasks,
      };
      onSave(newTask);
      onClose();
    }
  };

  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg">
          {mode === "add" ? "Add New ToDo" : "Edit ToDo"}
        </h3>
        <form
          className="my-4 flex flex-col gap-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add your title"
            className="input input-bordered w-full placeholder:text-base"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered placeholder:text-base w-full"
            placeholder="Add your description"
          ></textarea>
          <div className="flex justify-center items-center gap-4">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add your tag"
              className="input input-bordered w-full placeholder:text-base"
            />
            <button type="button" className="btn btn-square btn-outline">
              <Plus />
            </button>
          </div>
          <div className="flex gap-4">
            <input
              type="text"
              value={subTask}
              onChange={(e) => setSubTask(e.target.value)}
              placeholder="Add your sub task"
              className="input input-bordered w-full placeholder:text-base"
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleAddSubTask}
            >
              Add Sub Task
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {subTasks.map((subTask, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-4"
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    defaultChecked={subTask.isComplete}
                    className="checkbox"
                  />
                  <p className="text-xl">{subTask.title}</p>
                </div>
                <div className="flex gap-4">
                  <SquarePen />
                  <Trash className="hover:text-red-500 hover:shadow-xl" />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleSave}
          >
            {mode === "add" ? "Add Todo" : "Save Changes"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ModalTodo;
