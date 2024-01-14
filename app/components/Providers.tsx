"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ms from "ms";
import { ReactNode, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import AuthContextProvider from "../contexts/AuthContextProvider";
import store from "../redux/store";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: ms("1m"),
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
