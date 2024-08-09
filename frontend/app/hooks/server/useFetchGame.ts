import { cache } from "react";
import Game from "../../entities/Game";
import apiService from "../../services/apiService";

export const revalidate = 10 * 60; // 10 minutes

const useFetchGame = cache(async (id: number) => {
  const response = await apiService.get<Game>(`/games/${id}`);
  return response;
});

export default useFetchGame;
