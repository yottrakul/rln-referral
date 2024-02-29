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
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
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

      // เพิ่ม role ให้กับ session ที่ได้จาก token
      session.user.role = token.role;

      return session;
    },
    async jwt({ token }) {
      // เพิ่ม role ให้กับ token
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
