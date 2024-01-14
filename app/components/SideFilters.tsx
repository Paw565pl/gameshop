"use client";

import useFetchGenres from "../hooks/client/useFetchGenres";
import useFetchPlatforms from "../hooks/client/useFetchPlatforms";
import { actions } from "../redux/gameQuerySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import RadioFilter from "./filters/RadioFilter";
import RangeFilter from "./filters/RangeFilter";

const SideFilters = () => {
  const { data: genres, fetchNextPage: fetchMoreGenres } = useFetchGenres();
  const { data: platforms, fetchNextPage: fetchMorePlatforms } =
    useFetchPlatforms();

  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector((s) => s.gameQuery.genre);
  const selectedPlatform = useAppSelector((s) => s.gameQuery.platform);

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
        fetchNextPage={fetchMoreGenres}
        handleChange={(value) => dispatch(actions.setGenre(value))}
      />
      <RadioFilter
        title="Platforms"
        selected={selectedPlatform}
        data={platforms}
        fetchNextPage={fetchMorePlatforms}
        handleChange={(value) => dispatch(actions.setPlatform(value))}
      />
    </aside>
  );
};

export default SideFilters;
