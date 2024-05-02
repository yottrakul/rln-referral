import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";
import { db } from "@/server/db";
import { getUserByEmail, getUserById } from "@/app/_actions/data/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type Role } from "@prisma/client";
import GoogleProvider, { type GoogleProfile } from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env";
import { LoginSchema } from "@/app/_schemas";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getFile, getSignedURL } from "@/app/_actions/s3/actions";
import { SECURE_IMAGE_ENDPOINT } from "@/app/_lib/definition";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: Role;
      firstName?: string;
      lastName?: string;
      hospitalId?: number;
    } & DefaultSession["user"];
  }

  interface Profile extends GoogleProfile {
    firstName: string;
    lastName: string;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    firstName?: string;
    lastName?: string;
    image?: string;
    hospitalId?: number;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    session: ({ session, token }) => {
      // session.user.name = token.name;
      // session.user.image = token.picture;

      // เพิ่ม id ให้กับ session ที่ได้จาก token
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      // เพิ่มชื่อและนามสกุล ให้กับ session ที่ได้จาก token
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;

      // เพิ่ม role ให้กับ session ที่ได้จาก token
      session.user.role = token.role;

      // เพิ่ม image ให้กับ session ที่ได้จาก token
      if (token.image) {
        session.user.image = token.image;
      }

      if (token.hospitalId) {
        session.user.hospitalId = token.hospitalId;
      }

      return session;
    },
    async jwt({ token, profile }) {
      // เพิ่ม role ให้กับ token
      if (profile) {
        token.firstName = profile.firstName;
        token.lastName = profile.lastName;
      }
      if (token.sub) {
        const exitingUser = await getUserById(token.sub);
        if (exitingUser?.role) {
          token.role = exitingUser.role;
        }
        if (exitingUser?.image) {
          const isURL = exitingUser.image.startsWith("http");
          if (!isURL) {
            token.image = `${SECURE_IMAGE_ENDPOINT}/${exitingUser.image.trim()}`;
          } else {
            token.image = exitingUser.image;
          }
        }
        if (exitingUser?.hospitalId) {
          token.hospitalId = exitingUser.hospitalId;
        }
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider<GoogleProfile>({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "Type you email here..." },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user?.password) {
            throw new Error("Invalid email or password");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          } else {
            throw new Error("Invalid email or password");
          }
        }
        throw new Error("Something went wrong. Please try again.");
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// export const {
//   handlers: { GET, POST },
//   signIn,
//   signOut,
// } = NextAuth(authOptions);

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
