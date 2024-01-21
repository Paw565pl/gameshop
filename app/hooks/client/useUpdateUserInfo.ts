import { RegisterUserValues } from "@/app/schemas/registerUserSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import useFetchUserInfo from "./useFetchUserInfo";

const updateUserInfo = async (
  data: RegisterUserValues,
  currentUsername: string | undefined,
) => {
  const { username, email, password } = data;

  if (username !== currentUsername) {
    const usernameResponse = await authService.post(
      "/auth/users/set_username/",
      {
        new_username: username,
        current_password: password,
      },
    );
    if (usernameResponse.status !== 204)
      return Promise.reject(usernameResponse);
  }

  const emailResponse = await authService.put("/auth/users/me/", { email });
  return emailResponse;
};

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  const { data: userInfo } = useFetchUserInfo();
  const currentUsername = userInfo?.username;
  const key = ["userInfo"];

  return useMutation<AxiosResponse, AxiosError, RegisterUserValues>({
    mutationKey: key,
    mutationFn: (data) => updateUserInfo(data, currentUsername),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
};

export default useUpdateUserInfo;
