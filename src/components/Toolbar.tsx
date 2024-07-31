import React from "react";

// types
import { ToolbarProps } from "../types/types";
const Toolbar: React.FC<ToolbarProps> = ({
  filter,
  setFilter,
  filteredTasks,
}) => {
  const handleFilter = (filter: "All" | "Active" | "Completed") => {
    switch (filter) {
      case "All":
        setFilter("All");
        break;
      case "Active":
        setFilter("Active");
        break;
      case "Completed":
        setFilter("Completed");
        break;
    }
  };

  return (
    <div className="flex justify-between mb-4">
      <p className="text-gray-500 font-medium">
        {filteredTasks.length} items left
      </p>
      <div className="flex gap-4 items-end">
        <button
          onClick={() => handleFilter("All")}
          className={`${filter === "All" ? "font-semibold duration-200" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => handleFilter("Active")}
          className={` ${
            filter === "Active" ? "font-semibold duration-200" : ""
          }`}
        >
          Active
        </button>
        <button
          onClick={() => handleFilter("Completed")}
          className={` ${
            filter === "Completed" ? "font-semibold duration-200" : ""
          }`}
        >
          Completed
        </button>
      </div>
      <p className="text-gray-500 font-medium hover:underline cursor-pointer hover:text-red-500">
        Clear All
      </p>
    </div>
  );
};

export default Toolbar;
