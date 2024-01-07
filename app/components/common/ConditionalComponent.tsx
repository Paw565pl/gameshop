"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import { ReactNode, useContext } from "react";

interface ConditionalComponentProps {
  authenticatedComponent: ReactNode;
  anonymousComponent: ReactNode;
}

const ConditionalComponent = ({
  authenticatedComponent,
  anonymousComponent,
}: ConditionalComponentProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? authenticatedComponent : anonymousComponent;
};

export default ConditionalComponent;
