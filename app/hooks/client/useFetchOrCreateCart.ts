import Cart from "@/app/entities/Cart";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";
import ms from "ms";

const fetchOrCreateCart = async () => {
  const { data } = await authService.get<PaginatedResponse<Cart>>("/carts/");
  if (data.count !== 0) {
    return data.results[0];
  }

  const { data: cart } = await authService.post<Cart>("/carts/");
  return cart;
};

const useFetchOrCreateCart = () => {
  const { data: userInfo } = useFetchUserInfo();

  return useQuery<Cart, AxiosError>({
    queryKey: ["userCart", userInfo?.id],
    queryFn: fetchOrCreateCart,
    staleTime: ms("1h"),
  });
};

export default useFetchOrCreateCart;
