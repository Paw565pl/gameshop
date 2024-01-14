"use client";

import useFetchGenres from "../hooks/client/useFetchGenres";
import { useAppSelector } from "../redux/hooks";
import RadioFilter from "./filters/RadioFilter";
import RangeFilter from "./filters/RangeFilter";

const SideFilters = () => {
  const { data: genres, fetchNextPage } = useFetchGenres();
  const selectedGenre = useAppSelector((s) => s.gameQuery.genre);
  const currentYear = new Date().getFullYear();

  return (
    <aside className="hidden w-1/6 sm:block">
      <h3 className="mb-6 text-center">Filters</h3>
      <RangeFilter title="Price" min={0} max={1000} onChange={() => {}} />
      <RangeFilter title="Metacritic" min={0} max={100} onChange={() => {}} />
      <RangeFilter
        title="Release Year"
        min={1970}
        max={currentYear}
        onChange={() => {}}
      />
      <RadioFilter
        title="Genre"
        selected={selectedGenre}
        data={genres}
        onChange={() => {}}
        fetchNextPage={fetchNextPage}
      />
    </aside>
  );
};

export default SideFilters;
