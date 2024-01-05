import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig } from "axios";
import ms from "ms";
import { cache } from "react";
import Game from "../entities/Game";
import PaginatedResponse from "../entities/PaginatedResponse";
import apiService from "../services/apiService";

export const fetchGames = cache(async (requestConfig?: AxiosRequestConfig) => {
  const { data } = await apiService.get<PaginatedResponse<Game>>(
    "/games",
    requestConfig,
  );
  return data;
});

const useFetchGames = () =>
  useInfiniteQuery<PaginatedResponse<Game>, AxiosError>({
    queryKey: ["games"],
    queryFn: ({ pageParam }) => fetchGames({ params: { page: pageParam } }),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: ms("10m"),
  });

export default useFetchGames;
