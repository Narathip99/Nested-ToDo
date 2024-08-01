import React, { useState, useEffect } from "react";
import { ModalTodoProps, Task } from "../types/types";
import { SquarePen, Trash } from "lucide-react";
import { requiredInput } from "../utils/requiredInput";

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
  const [tags, setTags] = useState<string[]>([]);
  const [subTask, setSubTask] = useState("");
  const [subTasks, setSubTasks] = useState<
    { id: number; title: string; isComplete: boolean }[]
  >([]);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState<number | null>(null);
  const [editTagIndex, setEditTagIndex] = useState<number | null>(null);

  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title);
      setDescription(task.description);
      setTags(task.tags);
      setSubTasks(task.subTask || []);
    } else {
      resetForm();
    }
  }, [mode, task]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTag("");
    setTags([]);
    setSubTask("");
    setSubTasks([]);
    setEditSubTaskIndex(null);
    setEditTagIndex(null);
  };

  const handleAddSubTask = () => {
    if (subTask) {
      if (editSubTaskIndex !== null) {
        const updatedSubTasks = [...subTasks];
        updatedSubTasks[editSubTaskIndex] = {
          ...updatedSubTasks[editSubTaskIndex],
          title: subTask,
        };
        setSubTasks(updatedSubTasks);
        setEditSubTaskIndex(null);
      } else {
        setSubTasks([
          ...subTasks,
          { id: Date.now(), title: subTask, isComplete: false },
        ]);
      }
      setSubTask("");
    }
  };

  const handleAddTag = () => {
    if (tag) {
      if (editTagIndex !== null) {
        const updatedTags = [...tags];
        updatedTags[editTagIndex] = tag;
        setTags(updatedTags);
        setEditTagIndex(null);
      } else {
        setTags([...tags, tag]);
      }
      setTag("");
    }
  };

  const handleEditSubTask = (index: number) => {
    setSubTask(subTasks[index].title);
    setEditSubTaskIndex(index);
  };

  const handleEditTag = (index: number) => {
    setTag(tags[index]);
    setEditTagIndex(index);
  };

  const handleDeleteSubTask = (index: number) => {
    setSubTasks(subTasks.filter((_, i) => i !== index));
  };

  const handleDeleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubTaskCheckboxChange = (index: number) => {
    const updatedSubTasks = subTasks.map((subTask, i) =>
      i === index ? { ...subTask, isComplete: !subTask.isComplete } : subTask
    );
    setSubTasks(updatedSubTasks);
  };

  const handleSave = () => {
    if (requiredInput(title)) {
      return;
    }

    const newTask: Task = {
      id: mode === "add" ? Date.now() : task!.id,
      title,
      description,
      tags,
      isComplete: mode === "edit" ? task!.isComplete : false,
      subTask: subTasks,
    };
    onSave(newTask);
    resetForm();
    onClose();
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
          <div className="flex gap-4">
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Add your tag"
              className="input input-bordered w-full placeholder:text-base"
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleAddTag}
            >
              {editTagIndex !== null ? "Edit Tag" : "Add Tag"}
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-col gap-4">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-4"
                >
                  <p className="text-xl">{tag}</p>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-square hover:bg-orange-500"
                      onClick={() => handleEditTag(index)}
                    >
                      <SquarePen className="hover:text-white" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-square hover:bg-red-500"
                      onClick={() => handleDeleteTag(index)}
                    >
                      <Trash className="w-5 h-5 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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
              {editSubTaskIndex !== null ? "Edit Sub Task" : "Add Sub Task"}
            </button>
          </div>
          {subTasks.length > 0 && (
            <div className="flex flex-col gap-4">
              {subTasks.map((subTask, index) => (
                <div
                  key={subTask.id}
                  className="flex justify-between items-center gap-4"
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={subTask.isComplete}
                      onChange={() => handleSubTaskCheckboxChange(index)}
                      className="checkbox"
                    />
                    <p className="text-xl">{subTask.title}</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="btn btn-sm btn-square hover:bg-orange-500"
                      onClick={() => handleEditSubTask(index)}
                    >
                      <SquarePen className="hover:text-white" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-square hover:bg-red-500"
                      onClick={() => handleDeleteSubTask(index)}
                    >
                      <Trash className="w-5 h-5 hover:text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            className="text-base btn btn-primary"
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
