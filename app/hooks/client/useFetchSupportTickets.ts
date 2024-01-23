import PaginatedResponse from "@/app/entities/PaginatedResponse";
import SupportTicket from "@/app/entities/SupportTicket";
import authService from "@/app/services/authService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";
import useFetchUserInfo from "./useFetchUserInfo";

const fetchSupportTickets = async (pageNumber: unknown) => {
  const { data } = await authService.get<PaginatedResponse<SupportTicket>>(
    "/support-tickets/",
    {
      params: {
        page: pageNumber,
      },
    },
  );
  return data;
};

const useFetchSupportTickets = () => {
  const { data: userInfo } = useFetchUserInfo();

  return useInfiniteQuery<PaginatedResponse<SupportTicket>, AxiosError>({
    queryKey: ["supportTickets", userInfo?.id],
    queryFn: ({ pageParam }) => fetchSupportTickets(pageParam),
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

export default useFetchSupportTickets;
