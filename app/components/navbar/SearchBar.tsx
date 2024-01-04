"use client";

import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <search className="flex items-center w-full mx-6 relative">
      <GoSearch
        className="absolute left-2 text-3xl cursor-pointer"
        onClick={() => console.log("search")}
      />
      <input
        type="text"
        placeholder="Search for games here"
        className="input input-bordered input-base-300 rounded-xl w-full focus:outline-none focus:border-accent pl-11"
      />
    </search>
  );
};

export default SearchBar;
