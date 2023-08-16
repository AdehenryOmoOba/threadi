import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware
export default authMiddleware({
    publicRoutes: [
      "/", 
      "api/webhook/clerk", 
      "/api/getUsers", 
      "/api/findUser", 
      "/api/createUser", 
      "/api/test", "/api/uploadthing" ,
      "/api/find-user", 
      "/api/comments",
      "/api/get-threadis",
      "/api/create-threadi"
    ],
    ignoredRoutes: ["api/webhook/clerk", ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
