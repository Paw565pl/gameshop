import { AuthContext } from "@/app/contexts/AuthContextProvider";
import AuthTokens from "@/app/entities/AuthTokens";
import { LoginUserValues } from "@/app/schemas/loginUserSchema";
import apiService from "@/app/services/apiService";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

const postLoginData = async (postData: LoginUserValues) => {
  const { data } = await apiService.post<AuthTokens>(
    "/auth/jwt/create/",
    postData,
  );
  return data;
};

const useLoginUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginUser } = useContext(AuthContext);

  return useMutation<AuthTokens, AxiosError, LoginUserValues>({
    mutationKey: ["loginUser"],
    mutationFn: postLoginData,
    onSuccess: (data) => {
      const { access, refresh } = data;
      loginUser({ access, refresh });

      const returnUrl = searchParams.get("returnUrl");
      router.push(returnUrl || "/");
    },
  });
};

export default useLoginUser;
