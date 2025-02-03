// next-auth.d.ts
import { UsersType } from "@/lib/auth";
import "next-auth";

declare module "next-auth" {
    interface Session {
        user: Omit<UsersType, "password">;
    }

    // if we enable eslint here, we get an error that we aren't putting any custom properties, but we don't have to put any custom properties and just the type of our user model
    interface User extends UsersType {} //eslint-disable-line
}