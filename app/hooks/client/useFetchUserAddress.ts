import Address from "@/app/entities/Address";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ms from "ms";

const fetchUserAddress = async () => {
  const {
    data: { results },
  } = await authService.get<PaginatedResponse<Address>>("/addresses");

  if (results.length === 0) {
    return undefined;
  }

  const address = results[0];
  return address;
};

const useFetchUserAddress = () =>
  useQuery<Address | undefined, AxiosError>({
    queryKey: ["userAddress"],
    queryFn: fetchUserAddress,
    staleTime: ms("1h"),
  });

export default useFetchUserAddress;
