import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const postFavouriteGame = async (id: number) => {
  const response = await authService.post(`/favourite-games/`, { game_id: id });
  return response;
};

const useAddFavouriteGame = (id: number) => {
  const queryClient = useQueryClient();
  const key = ["favouriteGames"];

  return useMutation<AxiosResponse, AxiosError>({
    mutationKey: ["favouriteGames"],
    mutationFn: () => postFavouriteGame(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
};

export default useAddFavouriteGame;
