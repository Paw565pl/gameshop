"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import AuthTokens from "../entities/AuthTokens";

interface AuthContext {
  isAuthenticated: boolean;
  loginUser: (authTokens: AuthTokens) => void;
  logoutUser: () => void;
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
      !!localStorage.getItem("refresh-token");

    setIsAuthenticated(hasTokens);
  }, []);

  const loginUser = (authTokens: AuthTokens) => {
    localStorage.setItem("access-token", authTokens.access);
    localStorage.setItem("refresh-token", authTokens.refresh);

    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
