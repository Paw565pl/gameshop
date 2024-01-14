import Genre from "@/app/entities/Genre";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import apiService from "@/app/services/apiService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { cache } from "react";

export const revalidate = 60 * 60; // 1 hour

export const fetchGenres = cache(async (pageNumber: unknown) => {
  const { data } = await apiService.get<PaginatedResponse<Genre>>("/genres", {
    params: {
      page: pageNumber,
      page_size: 7,
    },
  });
  return data;
});

const useFetchGenres = () =>
  useInfiniteQuery<PaginatedResponse<Genre>, AxiosError>({
    queryKey: ["genres"],
    queryFn: ({ pageParam }) => fetchGenres(pageParam),
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

export default useFetchGenres;
