import { ChangeUserPasswordValues } from "@/app/schemas/changeUserPasswordSchema";
import authService from "@/app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const updateUserPassword = async (data: ChangeUserPasswordValues) => {
  const { currentPassword, newPassword } = data;
  const response = await authService.post("/auth/users/set_password/", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  return response;
};

const useUpdateUserPassword = () =>
  useMutation<AxiosResponse, AxiosError, ChangeUserPasswordValues>({
    mutationKey: ["userPassword"],
    mutationFn: updateUserPassword,
  });

export default useUpdateUserPassword;
