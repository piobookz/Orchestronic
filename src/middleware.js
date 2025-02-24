import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

const isOpsRoute = createRouteMatcher(["/ops(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (
    isOpsRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== "ops"
  ) {
    const url = ("/", req.url);
    return NextResponse.redirect(url);
  }

  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
