import Address from "@/app/entities/Address";
import PaginatedResponse from "@/app/entities/PaginatedResponse";
import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fetchUserAddress = async () => {
  const {
    data: { results },
  } = await authService.get<PaginatedResponse<Address>>("/addresses");

  if (results.length === 0) {
    return null;
  }

  const address = results[0];
  return address;
};

const useFetchUserAddress = () =>
  useQuery<Address | null, AxiosError>({
    queryKey: ["userAddress"],
    queryFn: fetchUserAddress,
    staleTime: 0,
  });

export default useFetchUserAddress;
