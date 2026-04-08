import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import queryClient from "../../lib/queryClient";

type Props = { children: ReactNode }

export const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};