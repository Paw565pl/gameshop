import Address from "@/app/entities/Address";
import { AddressValues } from "@/app/schemas/addressSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useFetchUserAddress from "./useFetchUserAddress";

const createOrUpdateUserAddress = async (
  data: AddressValues,
  id: number | undefined,
) => {
  if (!id) {
    const postResponse = await authService.post("/addresses/", data);
    return postResponse;
  }

  const putResponse = await authService.put(`/addresses/${id}/`, data);
  return putResponse;
};

const useCreateOrUpdateUserAddress = () => {
  const key = ["userAddress"];
  const queryClient = useQueryClient();
  const { data: currentAddress } = useFetchUserAddress();
  const id = currentAddress?.id;

  return useMutation<AxiosResponse<Address>, AxiosError, AddressValues>({
    mutationKey: key,
    mutationFn: (data) => createOrUpdateUserAddress(data, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
};

export default useCreateOrUpdateUserAddress;
