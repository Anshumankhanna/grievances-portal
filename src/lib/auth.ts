import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {
                enrollmentNumber: { label: "EnrollmentNumber", type: "number" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                if (!credentials) {
                    throw new Error("Invalid credentials");
                }
                
                const user = await User.findOne({
                    enrollmentNumber: credentials.enrollmentNumber,
                });

                if (!user) throw new Error("Wrong enrollment number");

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) throw new Error("Wrong password");

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    }
};