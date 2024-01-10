import authService from "@/app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const deleteFavouriteGame = async (id: number) => {
  const response = await authService.delete(`/favourite-games/${id}/`);
  return response;
};

const useDeleteFavouriteGame = (id: number) =>
  useMutation<AxiosResponse, AxiosError>({
    mutationKey: ["game", id, "is-favourite"],
    mutationFn: () => deleteFavouriteGame(id),
  });

export default useDeleteFavouriteGame;
