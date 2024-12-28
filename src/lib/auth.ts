import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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
                    });

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
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.uniqueId = token.uniqueId as string;
            }

            return session;
        }
    },
    session: {
        strategy: "jwt",
    }
};