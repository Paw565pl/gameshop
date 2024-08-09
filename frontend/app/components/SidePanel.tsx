"use client";

import useFetchGenres from "../hooks/client/useFetchGenres";
import useFetchPlatforms from "../hooks/client/useFetchPlatforms";
import { actions } from "../redux/gameQuerySlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SortSelector from "./SortSelector";
import RadioFilter from "./filters/RadioFilter";
import RangeFilter from "./filters/RangeFilter";

const SidePanel = () => {
  const { data: genres, fetchNextPage: fetchMoreGenres } = useFetchGenres();
  const { data: platforms, fetchNextPage: fetchMorePlatforms } =
    useFetchPlatforms();

  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector((s) => s.gameQuery.genre);
  const selectedPlatform = useAppSelector((s) => s.gameQuery.platform);

  const currentMinPrice = useAppSelector((s) => s.gameQuery.min_price);
  const currentMaxPrice = useAppSelector((s) => s.gameQuery.max_price);

  const currentMinMetacritic = useAppSelector(
    (s) => s.gameQuery.min_metacritic,
  );
  const currentMaxMetacritic = useAppSelector(
    (s) => s.gameQuery.max_metacritic,
  );

  const currentMinReleaseYear = useAppSelector(
    (s) => s.gameQuery.min_release_year,
  );
  const currentMaxReleaseYear = useAppSelector(
    (s) => s.gameQuery.max_release_year,
  );

  const currentYear = new Date().getFullYear();

  return (
    <aside className="hidden w-1/6 sm:block">
      <SortSelector />
      <RangeFilter
        title="Price"
        min={0}
        max={1000}
        currentMin={currentMinPrice}
        currentMax={currentMaxPrice}
        handleMinChange={(value) => dispatch(actions.setMinPrice(value))}
        handleMaxChange={(value) => dispatch(actions.setMaxPrice(value))}
      />
      <RangeFilter
        title="Metacritic"
        min={0}
        max={100}
        currentMin={currentMinMetacritic}
        currentMax={currentMaxMetacritic}
        handleMinChange={(value) => dispatch(actions.setMinMetacritic(value))}
        handleMaxChange={(value) => dispatch(actions.setMaxMetacritic(value))}
      />
      <RangeFilter
        title="Release year"
        min={1970}
        max={currentYear}
        currentMin={currentMinReleaseYear}
        currentMax={currentMaxReleaseYear}
        handleMinChange={(value) => dispatch(actions.setMinReleaseYear(value))}
        handleMaxChange={(value) => dispatch(actions.setMaxReleaseYear(value))}
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

export default SidePanel;
