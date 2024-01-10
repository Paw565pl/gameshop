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
  const result =
    !!localStorage.getItem("access-token") &&
    !!localStorage.getItem("refresh-token");

  return result;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasTokens());

  const loginUser = (authTokens: AuthTokens, username: string) => {
    localStorage.setItem("access-token", authTokens.access);
    localStorage.setItem("refresh-token", authTokens.refresh);
    localStorage.setItem("username", username);

    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("username");

    setIsAuthenticated(false);
  };

  const getUser = () => {
    const username = localStorage.getItem("username");
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
