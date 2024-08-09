import { SupportTicketMessageValues } from "@/app/schemas/supportTicketMessageSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";

interface PostData extends SupportTicketMessageValues {
  orderId: string;
}

const createSupportTicket = async (postData: PostData) => {
  const response = authService.post("/support-tickets/", {
    complaint: postData.content,
    order_id: postData.orderId,
  });
  return response;
};

const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useFetchUserInfo();
  const supportTicketsQueryKey = ["supportTickets", userInfo?.id];

  return useMutation<AxiosResponse, AxiosError, PostData>({
    mutationKey: ["createSupportTicket"],
    mutationFn: createSupportTicket,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: supportTicketsQueryKey }),
  });
};

export default useCreateSupportTicket;
