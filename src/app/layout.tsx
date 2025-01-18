import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/navbar";

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
      <html lang='ko'>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </>
  );
}
