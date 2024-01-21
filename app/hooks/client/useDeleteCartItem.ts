import Cart from "@/app/entities/Cart";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useFetchOrCreateCart from "./useFetchOrCreateCart";
import useFetchUserInfo from "./useFetchUserInfo";

const deleteCartItem = async (cartId: string | undefined, itemId: number) => {
  const response = await authService.delete(
    `/carts/${cartId}/items/${itemId}/`,
  );
  return response;
};

const useDeleteCartItem = (itemId: number) => {
  const queryClient = useQueryClient();
  const { data: cart } = useFetchOrCreateCart();
  const { data: userInfo } = useFetchUserInfo();
  const queryKey = ["userCart", userInfo?.id];

  return useMutation<AxiosResponse, AxiosError, void, Cart>({
    mutationKey: ["deleteCartItemQuantity"],
    mutationFn: () => deleteCartItem(cart?.id, itemId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousCart = queryClient.getQueryData<Cart>(queryKey);

      queryClient.setQueryData(queryKey, (oldCart: Cart) => {
        const updatedCartItems = oldCart?.items.filter(
          (item) => item.id !== itemId,
        );

        return { ...oldCart, items: updatedCartItems };
      });

      return previousCart;
    },

    onError: (error, newTodo, previousCart) => {
      queryClient.setQueryData(queryKey, previousCart);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useDeleteCartItem;
