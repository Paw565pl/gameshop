import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SidePanel from "./components/SidePanel";
import GameCardGrid from "./components/gameCardGrid";
import usePrefetchGames from "./hooks/server/usePrefetchGames";
import usePrefetchGenres from "./hooks/server/usePrefetchGenres";
import usePrefetchPlatforms from "./hooks/server/usePrefetchPlatforms";

const RootPage = async () => {
  const queryClient = new QueryClient();

  const games = usePrefetchGames(queryClient);
  const genres = usePrefetchGenres(queryClient);
  const platforms = usePrefetchPlatforms(queryClient);

  await Promise.all([games, genres, platforms]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex gap-10">
        <SidePanel />
        <GameCardGrid />
      </div>
    </HydrationBoundary>
  );
};

export default RootPage;
