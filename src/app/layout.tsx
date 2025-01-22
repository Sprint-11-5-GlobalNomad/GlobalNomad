import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/common/layout/navbar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../app/react-query/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "당신의 일상을 특별하게 만드는 한 번의 클릭",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
        </QueryClientProvider>
      </body>
    </html>
  );
}
