import Layout from "@/components/Layout";
import "./globals.css";
import { Inter } from "next/font/google";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter clone",
  description: "Created by Willian in Next 13",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout session={session}>{children}</Layout>
      </body>
    </html>
  );
}
