import { connectDB } from "@/lib/mongodb";
import { UserDocument } from "@/models";
import User from "@/models/User";
import { SessionUserFields } from "@/types/userTypes";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const {
    AUTH_SECRET: secret,
    MAKE_ADMIN_KEY,
    ADMIN_PATH,
    DEVADMIN_PATH
} = process.env;

export default async function POST(req: NextRequest) {
    if (secret === undefined) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const token: JWT & SessionUserFields | null = await getToken({ req, secret }) as JWT & SessionUserFields | null;
    
    if (token === null || token.basePath === undefined || token.basePath === null) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    const adminKey = req.nextUrl.searchParams.get("admin-key");
    const requestedPath = req.nextUrl.searchParams.get("route");

    if (
        adminKey === null ||
        requestedPath === null ||
        MAKE_ADMIN_KEY === undefined ||
        ADMIN_PATH === undefined ||
        DEVADMIN_PATH === undefined
    ) {
        return NextResponse.redirect(new URL(token.basePath, req.url));
    }
    
    if (adminKey === MAKE_ADMIN_KEY) {
        try {
            await connectDB();

            const user: UserDocument | null = await User.findOne({ uniqueId: token.uniqueId }).select("role");
            
            if (user === null) {
                console.error("User not found");
                return NextResponse.redirect(new URL(token.basePath, req.url));
            }

            user.role = requestedPath === ADMIN_PATH? "admin" : requestedPath === DEVADMIN_PATH? "devadmin" : "user";

            await user.save();
        } catch (error) {
            console.error(error);
        }
    }

    return NextResponse.redirect(new URL(token.basePath, req.url));
}