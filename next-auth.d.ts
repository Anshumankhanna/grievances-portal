// next-auth.d.ts
import { TokenUserFields } from "@/types/userTypes";
import "next-auth";

declare module "next-auth" {
    interface Session {
        user: TokenUserFields;
    }

    interface User extends TokenUserFields {} //eslint-disable-line
}