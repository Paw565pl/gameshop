"use client";

import { ChangeEvent, ReactNode } from "react";
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { OrderValue, actions } from "../redux/gameQuerySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface SortOrder {
  label: string;
  value: OrderValue;
  icon: ReactNode;
}

const sortOrders: SortOrder[] = [
  { label: "No sorting", value: "", icon: <FaSort /> },
  { label: "Asc Name", value: "name", icon: <FaSortAlphaDown /> },
  { label: "Desc Name", value: "-name", icon: <FaSortAlphaUp /> },
  { label: "Asc Release year", value: "released", icon: <FaSortAlphaDown /> },
  { label: "Desc Release year", value: "-released", icon: <FaSortAlphaUp /> },
  { label: "Asc Metacritic", value: "metacritic", icon: <FaSortAlphaDown /> },
  { label: "Desc Metacritic", value: "-metacritic", icon: <FaSortAlphaUp /> },
  { label: "Asc Price", value: "price", icon: <FaSortAlphaDown /> },
  { label: "Desc Price", value: "-price", icon: <FaSortAlphaUp /> },
];

const SortSelector = () => {
  const selectedOrdering = useAppSelector((s) => s.gameQuery.ordering);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(actions.setOrdering(value));
  };

  return (
    <div>
      <select
        name="sort"
        id="sort"
        className="select select-bordered select-md mb-2 block w-full rounded focus:border-accent focus:outline-none"
        value={selectedOrdering}
        onChange={handleChange}
      >
        {sortOrders.map((sortOrder, index) => (
          <option value={sortOrder.value} key={index}>
            {sortOrder.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelector;
