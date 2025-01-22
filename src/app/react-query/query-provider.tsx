"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/app/react-query/react-query";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
