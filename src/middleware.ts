
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "./app/utils/jwtDecode";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public route: Allow everyone to access /dashboard/recipe-management/{id}
  if (pathname.match(/^\/dashboard\/recipe-management\/[a-zA-Z0-9]+$/)) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = cookies().get("accessToken")?.value;

  // If no access token, handle unauthenticated routes
  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to login and register
    } else {
      // Redirect to login if the route is protected
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  // Decode the access token to get the user role
  const decodedToken = decode(accessToken) as any;
  const role = decodedToken?.role;



  // Admin routes: Allow full access to admin
  if (role === "admin") {
    if (pathname.match(/^\/dashboard\/(recipe-management|blog-management)/)) {
      return NextResponse.next();
    }
  }

  // User access to specific sub-routes like /my-recipe or /my-blog
  if (
    role === "user" &&
    (pathname.match(/^\/dashboard\/recipe-management\/my-recipe/) ||
      pathname.match(/^\/dashboard\/blog-management\/my-blog/))
  ) {
    return NextResponse.next();
  }

  // Deny user access to general recipe-management or blog-management pages
  if (
    role === "user" &&
    pathname.match(/^\/dashboard\/(recipe-management|blog-management)$/)
  ) {
    return NextResponse.redirect(new URL("/", request.url)); // Redirect to home
  }

  // Allow user access to specific blog or recipe management routes (with an ID)
  if (
    role === "user" &&
    (pathname.match(/^\/dashboard\/recipe-management\/[a-zA-Z0-9]+$/) ||
      pathname.match(/^\/dashboard\/blog-management\/[a-zA-Z0-9]+$/))
  ) {
    return NextResponse.next();
  }
  // Allow general dashboard access for both admin and user roles
  if ((role === "admin" || role === "user") && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }

  // If no valid role or route match, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:page*"],
};
