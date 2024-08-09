import { initialGameQuery } from "@/app/redux/gameQuerySlice";
import { QueryClient } from "@tanstack/react-query";
import { fetchGames } from "../client/useFetchGames";

const usePrefetchGames = async (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: ["games", initialGameQuery],
    queryFn: ({ pageParam }) => fetchGames({ params: { page: pageParam } }),
    initialPageParam: 1,
  });

export default usePrefetchGames;
