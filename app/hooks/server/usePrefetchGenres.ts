import { QueryClient } from "@tanstack/react-query";
import { fetchGenres } from "../client/useFetchGenres";

const usePrefetchGenres = async (queryClient: QueryClient) =>
  queryClient.prefetchInfiniteQuery({
    queryKey: ["genres"],
    queryFn: ({ pageParam }) => fetchGenres({ params: { page: pageParam } }),
    initialPageParam: 1,
  });

export default usePrefetchGenres;
