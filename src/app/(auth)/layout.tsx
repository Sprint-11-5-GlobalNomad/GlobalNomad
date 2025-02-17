import "@/styles/globals.css";
import QueryProvider from "../react-query/query-provider";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryProvider>{children}</QueryProvider>;
}
