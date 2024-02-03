/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { auth } from "@/server/auth";

export default auth((req) => {
  // req.auth
  const isLogin = !!req.auth;
  console.log("Routes", req.nextUrl.pathname);
  console.log("IsLogin:", isLogin);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
