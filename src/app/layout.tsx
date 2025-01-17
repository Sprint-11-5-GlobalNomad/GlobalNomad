import type { Metadata } from "next";
import "@/styles/globals.css";

// import localFont from "next/font/local";
// const pretendard = localFont({
//   src: [
//     {
//       path: "/fonts/PretendardVariable.woff2",
//       weight: "100 900",
//       style: "normal",
//     },
//   ],
//   variable: "--font-pretendard",
// });

export const metadata: Metadata = {
  title: "GlobalNomad",
  description: "GlobalNomad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body>{children}</body>
    </html>
  );
}
