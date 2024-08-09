import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";

const postFavouriteGame = async (id: number) => {
  const response = await authService.post(`/favourite-games/`, { game_id: id });
  return response;
};

const useAddFavouriteGame = (id: number) => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useFetchUserInfo();
  const queryKey = ["favouriteGames", userInfo?.id];

  return useMutation<AxiosResponse, AxiosError>({
    mutationKey: ["favouriteGames"],
    mutationFn: () => postFavouriteGame(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export default useAddFavouriteGame;
