import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SideFilters from "./components/SideFilters";
import GameCardGrid from "./components/gameCardGrid";
import usePrefetchGames from "./hooks/server/usePrefetchGames";
import usePrefetchGenres from "./hooks/server/usePrefetchGenres";

const RootPage = async () => {
  const queryClient = new QueryClient();

  const games = usePrefetchGames(queryClient);
  const genres = usePrefetchGenres(queryClient);

  await Promise.all([games, genres]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex gap-10">
        <SideFilters />
        <GameCardGrid />
      </div>
    </HydrationBoundary>
  );
};

export default RootPage;
