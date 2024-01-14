"use client";

import { actions } from "@/app/redux/gameQuerySlice";
import { useAppDispatch } from "@/app/redux/hooks";
import debounce from "just-debounce-it";
import { ChangeEvent, useRef } from "react";
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const searchInput = useRef<HTMLInputElement>(null);

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(actions.setName(value));
  }, 300);

  return (
    <search className="relative flex w-full items-center">
      <GoSearch
        className="absolute left-2 cursor-pointer text-3xl"
        onClick={() => searchInput.current?.focus()}
      />
      <input
        type="text"
        placeholder="Search for games here"
        className="input-base-300 input input-bordered w-full rounded-xl pl-11 focus:border-accent focus:outline-none"
        ref={searchInput}
        onChange={handleChange}
      />
    </search>
  );
};

export default SearchBar;
