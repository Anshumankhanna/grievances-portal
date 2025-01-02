import { getToken, JWT } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SessionUserFields } from "./types/userTypes";
import { basePathRegex } from "./utils/regex";

const { AUTH_SECRET: secret } = process.env;

export default async function middleware(req: NextRequest) {
    const token: JWT & SessionUserFields | null = await getToken({ req, secret }) as JWT & SessionUserFields | null;
    const requestedPath: string = req.nextUrl.pathname;
    
    if (token === null || token.uniqueId === undefined) {
        return NextResponse.redirect(new URL("/", req.url));
    }
    if (requestedPath.match(basePathRegex)) {
        return NextResponse.redirect(new URL(token.basePath, req.url));
    }
    if (requestedPath === "/profile") {
        return NextResponse.redirect(new URL(`${token.basePath}/profile`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/:path*",
        "/u/:path*",
        "/a/:path*",
    ]
};