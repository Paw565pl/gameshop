import CartItem from "@/app/entities/CartItem";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useFetchOrCreateCart from "./useFetchOrCreateCart";
import useFetchUserInfo from "./useFetchUserInfo";

interface CartItemValues {
  game_id: number;
  platform_id: number;
  quantity: number;
}

const addCartItem = async (
  cartId: string | undefined,
  postData: CartItemValues,
) => {
  const { data } = await authService.post<CartItem>(
    `carts/${cartId}/items/`,
    postData,
  );
  return data;
};

const useAddCartItem = () => {
  const queryClient = useQueryClient();
  const { data: cart } = useFetchOrCreateCart();
  const { data: userInfo } = useFetchUserInfo();
  const queryKey = ["userCart", userInfo?.id];

  return useMutation<CartItem, AxiosError, CartItemValues>({
    mutationKey: ["addCartItem"],
    mutationFn: (postData) => addCartItem(cart?.id, postData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });
};

export default useAddCartItem;
