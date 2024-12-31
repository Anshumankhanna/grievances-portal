// next-auth.d.ts
import { UserDocument } from "@/models/User";
import { SessionUserFields } from "@/types/userTypes";
import "next-auth";

declare module "next-auth" {
    interface Session {
        user: SessionUserFields;
    }

    // if we enable eslint here, we get an error that we aren't putting any custom properties, but we don't have to put any custom properties and just the type of our user model
    interface User extends UserDocument {} //eslint-disable-line
}