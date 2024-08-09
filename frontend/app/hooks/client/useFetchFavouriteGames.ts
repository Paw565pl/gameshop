import Game from "@/app/entities/Game";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import useFetchUserInfo from "./useFetchUserInfo";

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

const useFetchFavouriteGames = () => {
  const { data: userInfo } = useFetchUserInfo();

  return useInfiniteQuery<PaginatedResponse<Game>, AxiosError>({
    queryKey: ["favouriteGames", userInfo?.id],
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
    staleTime: ms("1h"),
  });
};

export default useFetchFavouriteGames;
