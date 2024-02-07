/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth from "next-auth";
import { type JWT } from "next-auth/jwt";
import authConfig from "@/server/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import { getUserByEmail, getUserById } from "@/app/_actions/data/user";
import { type Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google" && profile?.email) {
    //     const existingUser = await getUserByEmail(profile.email);

    //     if (!existingUser) {
    //       return false;
    //     }
    //   }
    //   return true;
    // },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (session.user && token.role) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.sub) {
        const exitingUser = await getUserById(token.sub);
        if (exitingUser?.role) {
          token.role = exitingUser.role;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
