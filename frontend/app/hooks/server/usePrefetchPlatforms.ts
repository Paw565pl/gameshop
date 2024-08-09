import { QueryClient } from "@tanstack/react-query";
import { fetchPlatforms } from "../client/useFetchPlatforms";

const usePrefetchPlatforms = async (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: ["platforms"],
    queryFn: ({ pageParam }) => fetchPlatforms({ params: { page: pageParam } }),
    initialPageParam: 1,
  });

export default usePrefetchPlatforms;
