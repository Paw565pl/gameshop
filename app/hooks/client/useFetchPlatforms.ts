import PaginatedResponse from "@/app/entities/PaginatedResponse";
import Platform from "@/app/entities/Platform";
import apiService from "@/app/services/apiService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { cache } from "react";

export const fetchPlatforms = cache(async (pageNumber: unknown) => {
  const { data } = await apiService.get<PaginatedResponse<Platform>>(
    "/genres",
    {
      params: {
        page: pageNumber,
        page_size: 10,
      },
    },
  );
  return data;
});

const useFetchPlatforms = () =>
  useInfiniteQuery<PaginatedResponse<Platform>, AxiosError>({
    queryKey: ["platforms"],
    queryFn: ({ pageParam }) => fetchPlatforms(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: ms("1h"),
  });

export default useFetchPlatforms;
