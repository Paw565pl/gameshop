import Cart from "@/app/entities/Cart";
import CartItem from "@/app/entities/CartItem";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useFetchOrCreateCart from "./useFetchOrCreateCart";
import useFetchUserInfo from "./useFetchUserInfo";

const updateCartItemQuantity = async (
  cartId: string | undefined,
  itemId: number,
  quantity: number,
) => {
  const { data } = await authService.patch<CartItem>(
    `/carts/${cartId}/items/${itemId}/`,
    { quantity },
  );
  return data;
};

const useUpdateCartItemQuantity = (itemId: number) => {
  const queryClient = useQueryClient();
  const { data: cart } = useFetchOrCreateCart();
  const { data: userInfo } = useFetchUserInfo();
  const queryKey = ["userCart", userInfo?.id];

  return useMutation<CartItem, AxiosError, number, Cart>({
    mutationKey: ["updateCartItemQuantity"],
    mutationFn: (quantity) =>
      updateCartItemQuantity(cart?.id, itemId, quantity),

    onMutate: async (newQuantity) => {
      await queryClient.cancelQueries({ queryKey });
      const previousCart = queryClient.getQueryData<Cart>(queryKey);

      queryClient.setQueryData(queryKey, (oldCart: Cart) => {
        const updatedCartItems = oldCart?.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item,
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

export default useUpdateCartItemQuantity;
