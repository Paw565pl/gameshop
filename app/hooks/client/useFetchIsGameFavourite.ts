import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import { cache } from "react";

export const revalidate = 60 * 60; // 1 hour

export const fetchIsGameFavourite = cache(async (id: number) => {
  const { status } = await authService.get<boolean>(`favourite-games/${id}`);
  return status === 200 ? true : false;
});

const usefetchIsGameFavourite = (id: number) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useQuery<boolean, AxiosError>({
    queryKey: ["game", id, "is-favourite"],
    queryFn: () => fetchIsGameFavourite(id),
    staleTime: ms("1h"),
    retry: false,
  });

export default usefetchIsGameFavourite;
