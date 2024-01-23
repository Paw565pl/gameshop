import Order from "@/app/entities/Order";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import useFetchUserInfo from "./useFetchUserInfo";

const fetchOrders = async (pageNumber: unknown) => {
  const { data } = await authService.get<PaginatedResponse<Order>>("/orders", {
    params: {
      page: pageNumber,
    },
  });
  return data;
};

const useFetchOrders = () => {
  const { data: userInfo } = useFetchUserInfo();

  return useInfiniteQuery<PaginatedResponse<Order>, AxiosError>({
    queryKey: ["userOrders", userInfo?.id],
    queryFn: ({ pageParam }) => fetchOrders(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const page = url.searchParams.get("page");
        return page;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: ms("1h"),
  });
};

export default useFetchOrders;
