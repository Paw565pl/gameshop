"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
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

export const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const hasTokens =
      !!localStorage.getItem("access-token") &&
      !!localStorage.getItem("refresh-token") &&
      !!localStorage.getItem("username");

    setIsAuthenticated(hasTokens);
  }, []);

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
    try {
      const username = localStorage.getItem("username");
      return username;
    } catch (error) {
      return "";
    }
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
