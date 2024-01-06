import { RegisterUserValues } from "@/app/schemas/registerUserSchema";
import apiService from "@/app/services/apiService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const registerUser = async (postData: RegisterUserValues) => {
  const response = await apiService.post("/auth/users/", postData);
  return response;
};

const useRegisterUser = () =>
  useMutation<AxiosResponse, AxiosError, RegisterUserValues>({
    mutationKey: ["registerUser"],
    mutationFn: registerUser,
  });

export default useRegisterUser;
