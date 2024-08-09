"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext, useLayoutEffect, useState } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login?returnUrl=" + pathname);
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, pathname, router]);

  if (loading) {
    return null;
  }

  return children;
};

export default PrivateRoute;
