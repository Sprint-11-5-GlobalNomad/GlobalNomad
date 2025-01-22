import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/common/layout/navbar";
import Footer from "@/components/common/layout/footer";
import QueryProvider from "./react-query/query-provider";

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
    <>
      <html lang="ko">
        <body>
          <Navbar />
          <QueryProvider>
            <main>{children}</main>
          </QueryProvider>
          <Footer />
        </body>
      </html>
    </>
  );
}
