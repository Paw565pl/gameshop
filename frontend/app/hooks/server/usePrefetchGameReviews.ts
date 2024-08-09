import { QueryClient } from "@tanstack/react-query";
import { fetchGameReviews } from "../client/useFetchGameReviews";

const usePrefetchGameReviews = async (
  queryClient: QueryClient,
  gameId: number,
) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: ["game", gameId, "reviews"],
    queryFn: ({ pageParam }) => fetchGameReviews(gameId, pageParam),
    initialPageParam: 1,
  });

export default usePrefetchGameReviews;
