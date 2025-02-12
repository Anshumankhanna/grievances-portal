import { connectDB } from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Admin, { AdminCategoriesType } from "@/models/Admin";
import { UserCategoriesType } from "@/models";

export type UsersType = {
    category: AdminCategoriesType | UserCategoriesType;
    uniqueId: string;
    basePath: string;
    password: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                uniqueId: { label: "uniqueId", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                if (!credentials) {
                    throw new Error("User not found");
                }

                const users = await Admin.aggregate([
                    { $unionWith: { coll: "users"} },
                    { $match: { uniqueId: credentials.uniqueId } },
                    {
                        $project: {
                            category: 1,
                            uniqueId: 1,
                            password: 1,
                            _id: 0
                        }
                    }
                ]);

                if (users.length < 1) {
                    throw new Error("User not found");
                }

                // We implement code in signup for "users.length === 1" so we don't need to check for it here.
                const user = users[0];

                if (!user)  {
                    throw new Error("User not found");
                }

                const passwordMatch: boolean = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("User not found");
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uniqueId = user.uniqueId;
                token.category = user.category;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.uniqueId = token.uniqueId as string;
                session.user.category = token.category as UserCategoriesType | AdminCategoriesType;
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) {
                return url;
            }

            return baseUrl;
        }
    },
    session: {
        strategy: "jwt",
    }
};