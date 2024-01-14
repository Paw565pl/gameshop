"use client";

import PaginatedResponse from "@/app/entities/PaginatedResponse";
import { InfiniteData } from "@tanstack/react-query";
import { useMemo } from "react";

interface Item {
  id: number;
  name: string;
  slug: string;
}

interface SelectFilterProps {
  title: string;
  selected: string;
  data: InfiniteData<PaginatedResponse<Item>> | undefined;
  fetchNextPage: () => void;
  handleChange: (value: string) => void;
}

const RadioFilter = ({
  title,
  selected,
  data,
  fetchNextPage,
  handleChange,
}: SelectFilterProps) => {
  const items = useMemo(
    () => data?.pages.flatMap((page) => page.results),
    [data],
  );

  return (
    <div className="mb-4 flex flex-col justify-center">
      <h4 className="mb-1 text-center text-sm">{title}</h4>
      <div className="form-control">
        <label className="label cursor-pointer justify-normal text-xs">
          <input
            type="radio"
            name={title}
            value=""
            className="radio radio-xs checked:bg-accent"
            onChange={(e) => handleChange(e.target.value)}
            checked={selected === ""}
          />
          <span className="label-text ml-1">All</span>
        </label>
      </div>
      {items?.map((item) => (
        <div key={item.id} className="form-control">
          <label className="label cursor-pointer justify-normal text-xs">
            <input
              type="radio"
              name={title}
              value={item.slug}
              className="radio radio-xs checked:bg-accent"
              onChange={(e) => handleChange(e.target.value)}
              checked={selected === item.slug}
            />
            <span className="label-text ml-1">{item.name}</span>
          </label>
        </div>
      ))}
      <button className="btn btn-ghost btn-xs" onClick={fetchNextPage}>
        Show more
      </button>
    </div>
  );
};

export default RadioFilter;
