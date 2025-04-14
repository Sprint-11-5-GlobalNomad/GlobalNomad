import type { Metadata } from "next";
import "@/styles/globals.css";
import Footer from "@/components/common/layout/footer";
import QueryProvider from "../react-query/query-provider";
import Navbar from "@/components/common/layout/navbar";
import Script from "next/script";

const KAKAO_MAP = process.env.NEXT_PUBLIC_KAKAO_MAP_APP_KEY;

export const metadata: Metadata = {
  title: "특별한 이색 체험, 원데이 클래스를 찾을 수 있는 곳 | GlobalNomad",
  description:
    "당신의 일상을 특별하게 만드는 한 번의 클릭. 원데이 클래스, 여행 가이드, 동아리, 체험 입장권 등 다양한 체험 상품들을 예약할 수 있습니다.",
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
        type="text/javascript"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP}&autoload=false&libraries=services`}
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
