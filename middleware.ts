import { jwtVerify, type JWTPayload } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { resolveModulePermissions } from "@/lib/module-access";

type SessionPayload = JWTPayload & {
  Permiso?: string[];
};

const authSecret = process.env.AUTH_SECRET
  ? new TextEncoder().encode(process.env.AUTH_SECRET)
  : null;

async function getSessionPermissions(req: NextRequest): Promise<string[] | null> {
  const token = req.cookies.get("session")?.value;

  if (!token) return [];
  if (!authSecret) return null;

  try {
    const { payload } = await jwtVerify<SessionPayload>(token, authSecret, {
      algorithms: ["HS256"],
    });

    return Array.isArray(payload.Permiso) ? payload.Permiso : [];
  } catch {
    return null;
  }
}

function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico")
  );
}

function buildRedirectUrl(req: NextRequest, pathname: string) {
  const url = new URL(pathname, req.url);
  url.searchParams.set("from", req.nextUrl.pathname + req.nextUrl.search);
  return url;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = req.cookies.get("session");
  const requiredPermissions = resolveModulePermissions(pathname);

  if (requiredPermissions && !sessionCookie) {
    return NextResponse.redirect(buildRedirectUrl(req, "/login"));
  }

  if (!requiredPermissions) {
    return NextResponse.next();
  }

  const permissions = await getSessionPermissions(req);

  if (permissions === null) {
    return NextResponse.redirect(buildRedirectUrl(req, "/login"));
  }

  const hasAccess = requiredPermissions.some((permission) => permissions.includes(permission));

  if (!hasAccess) {
    return NextResponse.redirect(buildRedirectUrl(req, "/sin-acceso"));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
