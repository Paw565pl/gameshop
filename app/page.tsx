import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import SideFilters from "./components/SideFilters";
import GameCardGrid from "./components/gameCard/GameCardGrid";
import usePrefetchGames from "./hooks/usePrefetchGames";

const RootPage = async () => {
  const queryClient = new QueryClient();
  await usePrefetchGames(queryClient);

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
