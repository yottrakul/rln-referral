"use client";
import { SessionProvider } from "next-auth/react";

const AuthSessionProviders = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthSessionProviders;
