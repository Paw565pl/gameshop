import { QueryClient } from "@tanstack/react-query";
import { fetchGames } from "./useFetchGames";

const usePrefetchGames = async (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: ["games"],
    queryFn: ({ pageParam }) => fetchGames({ params: { page: pageParam } }),
    initialPageParam: 1,
  });

export default usePrefetchGames;
