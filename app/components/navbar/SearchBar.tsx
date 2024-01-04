"use client";

import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <search className="relative mx-6 flex w-full items-center">
      <GoSearch
        className="absolute left-2 cursor-pointer text-3xl"
        onClick={() => console.log("search")}
      />
      <input
        type="text"
        placeholder="Search for games here"
        className="input-base-300 input input-bordered w-full rounded-xl pl-11 focus:border-accent focus:outline-none"
      />
    </search>
  );
};

export default SearchBar;
