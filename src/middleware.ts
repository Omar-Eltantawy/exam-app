import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login"];
const protectedRoutes = ["^/dashboard.*$"];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (
    protectedRoutes.some((route) =>
      new RegExp(route).test(request.nextUrl.pathname)
    )
  ) {
    if (request.nextUrl.pathname === "/dashboard/products/add") {
      return NextResponse.redirect(
        new URL("/dashboard", request.nextUrl.origin)
      );
    }

    if (token) return NextResponse.next();

    const redirectUrl = new URL("/login", request.nextUrl.origin);
    redirectUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (!token?.user) return NextResponse.next();
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  }

  // Store current request url in a custom header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
