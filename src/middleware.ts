import { getToken, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionUserFields } from "./types/userTypes";
import { basePathRegex } from "./utils/regex";

const { AUTH_SECRET: secret, ADMIN_PATH, DEVADMIN_PATH } = process.env;

export default async function middleware(req: NextRequest) {
    const requestedPath: string = req.nextUrl.pathname;

    if (requestedPath === "/about" || requestedPath === "/contact") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const token: JWT & SessionUserFields | null = await getToken({ req, secret }) as JWT & SessionUserFields | null;

    if (token === null) {
        if (requestedPath !== "/") {
            return NextResponse.redirect(new URL("/", req.url));
        }
        
        return NextResponse.next();
    }
    if (requestedPath.match(basePathRegex)) {
        return NextResponse.redirect(new URL(token.basePath, req.url));
    }
    if (requestedPath === "/profile") {
        return NextResponse.redirect(new URL(`${token.basePath}/profile`, req.url));
    }
    if (requestedPath === "/upgrade") {
        const adminPath = req.nextUrl.searchParams.get("admin-path");
        const adminKey = req.nextUrl.searchParams.get("admin-key");

        if (adminKey === null|| adminPath === null || (adminPath !== ADMIN_PATH && adminPath !== DEVADMIN_PATH)) {
            return NextResponse.redirect(new URL(token.basePath, req.url));
        }

        return NextResponse.redirect(new URL(`/api/make-admin?admin-path=${adminPath}&admin-key=${adminKey}`, req.url));
    }
    if (requestedPath === "/import" || requestedPath === "/export" || requestedPath === "/changeUserPassword") {
        if (token.category !== "admin" && token.category !== "devadmin") {
            return NextResponse.redirect(new URL(`${token.basePath}/`, req.url));
        }

        return NextResponse.redirect(new URL(`${token.basePath}${requestedPath}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/about",
        "/contact",
        "/u/:path*",
        "/a",
        "/profile",
        "/upgrade",
        "/import",
        "/export",
        "/changeUserPassword"
    ]
};