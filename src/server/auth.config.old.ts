// import Credentials from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import type { NextAuthConfig } from "next-auth";

// import { LoginSchema } from "@/app/_schemas";
// import { getUserByEmail } from "@/app/_actions/data/user";
// import bcrypt from "bcryptjs";
// import { env } from "@/env";

// export default {
//   pages: {
//     error: "/",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: env.GOOGLE_CLIENT_ID,
//       clientSecret: env.GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true,
//       profile(profile) {
//         return {
//           id: profile.id,
//           email: profile.email,
//           name: profile.name,
//           image: profile.picture,
//         };
//       },
//     }),
//     Credentials({
//       async authorize(credentials) {
//         const validatedFields = LoginSchema.safeParse(credentials);
//         if (validatedFields.success) {
//           const { email, password } = validatedFields.data;
//           const user = await getUserByEmail(email);
//           if (!user?.password) return null;
//           const passwordMatch = await bcrypt.compare(password, user.password);
//           if (passwordMatch) {
//             return user;
//           }
//         }

//         return null;
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;
