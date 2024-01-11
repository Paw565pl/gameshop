import User from "@/app/entities/User";
import authService from "@/app/services/authService";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const fetchUserInfo = async () => {
  const { data } = await authService.get<User>("/auth/users/me");
  return data;
};

const useFetchUserInfo = () =>
  useQuery<User, AxiosError>({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

export default useFetchUserInfo;
