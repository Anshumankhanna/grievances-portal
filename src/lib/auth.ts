import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";
import getBasePath from "@/utils/getBasePath";

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
                
                const user = await User
                    .findOne({
                        uniqueId: credentials.uniqueId,
                    })
                    .select("_id uniqueId password");

                if (!user) throw new Error("User not found");

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("User not found");

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.uniqueId = user.uniqueId;
                token._id = user._id;
                
                const { error, result } = await getBasePath(user.uniqueId);

                if (error !== null) {
                    token.basePath = "/";
                } else {
                    token.basePath = result;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.uniqueId = token.uniqueId as string;
                session.user._id = token._id as ObjectId;
                session.user.basePath = token.basePath as string;
            }

            return session;
        }
    },
    session: {
        strategy: "jwt",
    }
};