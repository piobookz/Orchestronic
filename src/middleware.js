import { clerkMiddleware } from "@clerk/nextjs/server"; // Use clerkMiddleware
import { NextResponse } from "next/server";

// Public Route everyone can access
const publicRoutes = ["/"];

export default clerkMiddleware({
  publicRoutes,
  async afterAuth(auth, req) {
    // Handle unauthenticated users trying to access protected routes
    if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Handle authenticated users
    if (auth.userId) {
      try {
        // Fetch the user's details from Clerk
        const user = await clerkClient.users.getUser(auth.userId);
        let role = user.publicMetadata.role;

        // If no role is assigned, default to 'dev'
        if (!role) {
          role = "dev";
          // Optionally, update the user's role in Clerk
          await clerkClient.users.updateUser(auth.userId, {
            publicMetadata: { ...user.publicMetadata, role },
          });
          console.log(`Assigned default role 'dev' to user ${auth.userId}`);
        }

        // Define role-specific routes
        const roleRoutes = {
          dev: "/dev",
          pm: "/pm",
          ops: "/ops",
        };

        // Get the intended route based on the user's role
        const intendedRoute = roleRoutes[role];

        // Redirect users to their role-specific route if they try to access a different route
        if (intendedRoute && !req.nextUrl.pathname.startsWith(intendedRoute)) {
          return NextResponse.redirect(new URL(intendedRoute, req.url));
        }
      } catch (error) {
        console.error("Error fetching or updating user details:", error);
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};


// const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

// const isOpsRoute = createRouteMatcher(["/ops(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId, redirectToSignIn } = await auth();

//   if (
//     isOpsRoute(req) &&
//     (await auth()).sessionClaims?.metadata?.role !== "ops"
//   ) {
//     const url = ("/", req.url);
//     return NextResponse.redirect(url);
//   }

//   if (!userId && !isPublicRoute(req)) {
//     return redirectToSignIn();
//   }
// });


