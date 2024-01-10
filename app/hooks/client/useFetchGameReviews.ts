import PaginatedResponse from "@/app/entities/PaginatedResponse";
import Review from "@/app/entities/Review";
import apiService from "@/app/services/apiService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { cache } from "react";

export const revalidate = 1 * 60; // 1 minute

export const fetchGameReviews = cache(
  async (gameId: number, pageNumber: unknown) => {
    const { data } = await apiService.get<PaginatedResponse<Review>>(
      `/games/${gameId}/reviews`,
      {
        params: {
          page: pageNumber,
        },
      },
    );
    return data;
  },
);

const useFetchGameReviews = (gameId: number) =>
  useInfiniteQuery<PaginatedResponse<Review>, AxiosError>({
    queryKey: ["game", gameId, "reviews"],
    queryFn: ({ pageParam }) => fetchGameReviews(gameId, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: ms("1m"),
  });

export default useFetchGameReviews;
