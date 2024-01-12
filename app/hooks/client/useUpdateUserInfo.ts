import { RegisterUserValues } from "@/app/schemas/registerUserSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const updateUserInfo = async (data: RegisterUserValues) => {
  const { username, email, password } = data;

  const savedUsername = localStorage.getItem("username");
  if (username !== savedUsername) {
    const usernameResponse = await authService.post(
      "/auth/users/set_username/",
      {
        new_username: username,
        current_password: password,
      },
    );
    if (usernameResponse.status !== 204)
      return Promise.reject(usernameResponse);
    localStorage.setItem("username", username);
  }

  const emailResponse = await authService.put("/auth/users/me/", { email });
  return emailResponse;
};

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const key = ["userInfo"];

  return useMutation<AxiosResponse, AxiosError, RegisterUserValues>({
    mutationKey: key,
    mutationFn: updateUserInfo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
};

export default useUpdateUserInfo;
