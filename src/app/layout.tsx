import type { Metadata } from "next";
import "@/styles/globals.css";
import Head from "next/head";

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
      <Head>
        <meta
          name='description'
          content='당신의 일상을 특별하게 만드는 한 번의 클릭'
        />
        <meta name='og:title' content='GlobalNomad' />
        <meta
          name='og:description'
          content='당신의 일상을 특별하게 만드는 한 번의 클릭'
        />
        <meta name='og:image' content='/logo.svg' />
      </Head>
      <html lang='ko'>
        <body>{children}</body>
      </html>
    </>
  );
}
