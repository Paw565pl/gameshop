import authService from "@/app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const postFavouriteGame = async (id: number) => {
  const response = await authService.post(`/favourite-games/`, { game_id: id });
  return response;
};

const useAddFavouriteGame = (id: number) =>
  useMutation<AxiosResponse, AxiosError>({
    mutationKey: ["game", id, "is-favourite"],
    mutationFn: () => postFavouriteGame(id),
  });

export default useAddFavouriteGame;
