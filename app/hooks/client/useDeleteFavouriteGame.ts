import Game from "@/app/entities/Game";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const deleteFavouriteGame = async (id: number) => {
  const response = await authService.delete(`/favourite-games/${id}/`);
  return response;
};

const useDeleteFavouriteGame = (id: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["favouriteGames"];

  return useMutation<
    AxiosResponse,
    AxiosError,
    void,
    InfiniteData<PaginatedResponse<Game>>
  >({
    mutationKey: ["favouriteGames", id],
    mutationFn: () => deleteFavouriteGame(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export default useDeleteFavouriteGame;
