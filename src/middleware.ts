import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from "@/routes";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = !!req.nextauth.token;
    // console.log(req.nextauth.token);
    // console.log(isLoggedIn);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isGuest = req.nextauth.token?.role === "GUEST";

    // console.log(isApiAuthRoute, isPublicRoute, isAuthRoute);

    if (isApiAuthRoute) {
      return null;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Login ผ่านมาได้แล้วแต่เป็น guest
    if (isGuest) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }

    return null;
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
