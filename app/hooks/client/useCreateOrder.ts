import Order from "@/app/entities/Order";
import { OrderValues } from "@/app/schemas/orderSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";

const createOrder = async (postData: OrderValues) => {
  const { paymentMethod, deliveryMethod, promoCode } = postData;
  const { data } = await authService.post<Order>("/orders/", {
    payment_method: paymentMethod,
    delivery_method: deliveryMethod,
    promo_code: promoCode,
  });
  return data;
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useFetchUserInfo();
  const cartQueryKey = ["userCart", userInfo?.id];
  const ordersQueryKey = ["userOrders", userInfo?.id];

  return useMutation<Order, AxiosError, OrderValues>({
    mutationKey: ["createOrder"],
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      queryClient.invalidateQueries({ queryKey: ordersQueryKey });
    },
  });
};

export default useCreateOrder;
