import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { RoleKeyType } from "@/types/roleTypes";
import { SessionUserFields } from "@/types/userTypes";
import getBasePath from "@/utils/getBasePath";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// have to make changes to this file

const {
    AUTH_SECRET: secret,
    MAKE_ADMIN_KEY,
    ADMIN_PATH,
    DEVADMIN_PATH
} = process.env;

export async function GET(req: NextRequest) {
    if (secret === undefined) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const token: JWT & SessionUserFields | null = await getToken({ req, secret }) as JWT & SessionUserFields | null;
    
    if (token === null || token.basePath === undefined || token.basePath === null) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const adminKey = req.nextUrl.searchParams.get("admin-key");
    const adminPath = req.nextUrl.searchParams.get("admin-path");

    if (
        adminKey === null ||
        adminPath === null ||
        MAKE_ADMIN_KEY === undefined ||
        ADMIN_PATH === undefined ||
        DEVADMIN_PATH === undefined
    ) {
        return NextResponse.redirect(new URL(token.basePath, req.url));
    }
    
    if (adminKey === MAKE_ADMIN_KEY) {
        try {
            const updatedRole: RoleKeyType = adminPath === ADMIN_PATH? "admin" : adminPath === DEVADMIN_PATH? "devadmin" : "user";

            await connectDB();
            await User.updateOne(
                { uniqueId: token.uniqueId },
                { $set: { role: updatedRole }}
            );
            
            const { error, result } = await getBasePath(token.uniqueId);

            if (error !== null) {
                return NextResponse.redirect(new URL(token.basePath, req.url));
            }
            
            token.basePath = result;
        } catch (error) {
            console.error(error);
        }
    }

    return NextResponse.redirect(new URL(token.basePath, req.url));
}