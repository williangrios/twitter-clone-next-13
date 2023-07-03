"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { RecoilRoot } from "recoil";

export default function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <div>
      <SessionProvider session={session}>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </SessionProvider>
    </div>
  );
}
