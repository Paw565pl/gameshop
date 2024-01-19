import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const fetchIsGameFavourite = async (id: number) => {
  const { status } = await authService.get<boolean>(`favourite-games/${id}`);
  return status === 200 ? true : false;
};

const useFetchIsGameFavourite = (id: number) =>
  useQuery<boolean, AxiosError>({
    queryKey: ["game", id, "isFavourite"],
    queryFn: () => fetchIsGameFavourite(id),
    staleTime: 0,
    retry: false,
  });

export default useFetchIsGameFavourite;
