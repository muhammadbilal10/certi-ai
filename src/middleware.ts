import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "./lib/db";
import { getUserById } from "./actions/user";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth: async (auth, req) => {
    if (auth.userId && auth.isPublicRoute) {
      // const existingUser = await db.user.findUnique({
      //   where: {
      //     id: auth.userId as string,
      //   },
      // });

      // if (!existingUser) {
      //   return NextResponse.redirect(new URL("/set-role", req.url));
      // }
      const path = "/dashboard";
      const redirect = new URL(path, req.url);
      return NextResponse.redirect(redirect);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
