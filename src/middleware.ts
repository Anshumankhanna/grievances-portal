import { getToken, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { basePathRegex } from "./utils/regex";
import { UsersType } from "./lib/auth";

const { AUTH_SECRET: secret } = process.env;

export default async function middleware(req: NextRequest) {
    const requestedPath: string = req.nextUrl.pathname;
    const token: JWT & Omit<UsersType, "password"> | null = await getToken({ req, secret }) as JWT & Omit<UsersType, "password"> | null;

    let res: NextResponse;

    if (token === null) {
        if (requestedPath !== "/") {
            res = NextResponse.redirect(new URL("/", req.url));
        }
        
        res = NextResponse.next();
    } else if (requestedPath.match(basePathRegex)) {
        res = NextResponse.redirect(new URL(token.basePath, req.url));
    } else if (requestedPath === "/profile") {
        res = NextResponse.redirect(new URL(`${token.basePath}/profile`, req.url));
    } else if (requestedPath === "/import" || requestedPath === "/export" || requestedPath === "/changeUserPassword") {
        if (token.category !== "admin" && token.category !== "devadmin") {
            res = NextResponse.redirect(new URL(`${token.basePath}/`, req.url));
        }

        res = NextResponse.redirect(new URL(`${token.basePath}${requestedPath}`, req.url));
    } else {
        res = NextResponse.next();
    }

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
}

export const config = {
    matcher: [
        "/",
        "/u/:path*",
        "/a",
        "/profile",
        "/import",
        "/export",
        "/changeUserPassword"
    ]
};