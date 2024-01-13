import Game from "@/app/entities/Game";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fetchFavouriteGames = async (pageNumber: unknown) => {
  const { data } = await authService.get<PaginatedResponse<Game>>(
    "/favourite-games",
    {
      params: {
        page: pageNumber,
      },
    },
  );
  return data;
};

const useFetchFavouriteGames = () =>
  useInfiniteQuery<PaginatedResponse<Game>, AxiosError>({
    queryKey: ["favouriteGames"],
    queryFn: ({ pageParam }) => fetchFavouriteGames(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

export default useFetchFavouriteGames;