"use client";

import { ReactNode, createContext, useState } from "react";
import AuthTokens from "../entities/AuthTokens";

interface AuthContext {
  isAuthenticated: boolean;
  loginUser: (authTokens: AuthTokens, username: string) => void;
  logoutUser: () => void;
  getUser: () => string | null;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const hasTokens = () => {
  if (typeof window !== "undefined") {
    const result =
      !!localStorage.getItem("access-token") &&
      !!localStorage.getItem("refresh-token") &&
      !!localStorage.getItem("username");

    return result;
  }
  return false;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasTokens());

  const loginUser = (authTokens: AuthTokens, username: string) => {
    typeof window !== "undefined"
      ? localStorage.setItem("access-token", authTokens.access)
      : null;
    typeof window !== "undefined"
      ? localStorage.setItem("refresh-token", authTokens.refresh)
      : null;
    typeof window !== "undefined"
      ? localStorage.setItem("username", username)
      : null;

    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    typeof window !== "undefined"
      ? localStorage.removeItem("access-token")
      : null;
    typeof window !== "undefined"
      ? localStorage.removeItem("refresh-token")
      : null;
    typeof window !== "undefined" ? localStorage.removeItem("username") : null;

    setIsAuthenticated(false);
  };

  const getUser = () => {
    const username =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    return username;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, logoutUser, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
