import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";
import { cookies } from "next/headers";
import { protectedRoutes, publicRoutes, routes } from "./routes";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.email) {
    return NextResponse.redirect(new URL(routes.login, req.nextUrl));
  }

  if (isPublicRoute && session?.email) {
    return NextResponse.redirect(new URL(routes.posts, req.nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
