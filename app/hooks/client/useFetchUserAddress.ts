import Address from "@/app/entities/Address";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";
import ms from "ms";

const fetchUserAddress = async () => {
  const { data } =
    await authService.get<PaginatedResponse<Address>>("/addresses");

  if (data.count === 0) {
    return null;
  }

  const address = data.results[0];
  return address;
};

const useFetchUserAddress = () => {
  const { data: userInfo } = useFetchUserInfo();

  return useQuery<Address | null, AxiosError>({
    queryKey: ["userAddress", userInfo?.id],
    queryFn: fetchUserAddress,
    staleTime: ms("1h"),
  });
};

export default useFetchUserAddress;
