import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import useFetchUserInfo from "./useFetchUserInfo";

export const fetchIsGameFavourite = async (id: number) => {
  const { status } = await authService.get<boolean>(`favourite-games/${id}`);
  return status === 200 ? true : false;
};

const useFetchIsGameFavourite = (id: number) => {
  const { data: userInfo } = useFetchUserInfo();

  return useQuery<boolean, AxiosError>({
    queryKey: ["game", id, "isFavourite", userInfo?.id],
    queryFn: () => fetchIsGameFavourite(id),
    staleTime: ms("1h"),
    retry: false,
  });
};

export default useFetchIsGameFavourite;
