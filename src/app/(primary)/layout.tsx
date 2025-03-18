import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/common/layout/footer";
import QueryProvider from "../react-query/query-provider";
import Navbar from "@/components/common/layout/navbar";
import Script from "next/script";

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "당신의 일상을 특별하게 만드는 한 번의 클릭",
  icons: "/logo.svg",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY}&libraries=services`}
        strategy="beforeInteractive"
      />
      <body>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
