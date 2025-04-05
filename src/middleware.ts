import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
  "/about",
]);

export default clerkMiddleware(async (auth, request) => {
  const authObject = await auth(); // Await the promise to get the auth object

  if (!isPublicRoute(request) && !authObject.userId) {
    return authObject.redirectToSignIn(); // Redirect to sign-in if not authenticated
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/((?!api|_next|.*\\..*).*)",
  ],
};
