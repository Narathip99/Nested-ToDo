import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

const Search: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-4 overflow-hidden w-[50px] h-[50px] hover:w-[270px] bg-base-200 hover:bg-base-300 rounded-full flex group items-center hover:duration-300 duration-300">
      <div className="flex items-center justify-center">
        <SearchIcon className="w-5 h-5" />
      </div>
      <input
        type="text"
        className="outline-none text-[20px] bg-transparent w-full font-normal px-4"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
