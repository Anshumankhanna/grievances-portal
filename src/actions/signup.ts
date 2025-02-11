"use server";

import { connectDB } from "@/lib/mongodb";
import User, { UserType } from "@/models/User";
import { OutputType } from "@/types/outputType";
import bcrypt from "bcryptjs";
import getUserDetails from "@/actions/getUserDetails";

export type UserDataFillType = Pick<UserType, "category" | "uniqueId" | "name" | "email" | "mobile" | "password">;

export const signup = async (userdata: UserDataFillType): Promise<OutputType<string>> => {
    const output: OutputType<string> = {
        error: null,
        result: ""
    };

    try {
        await connectDB();

        const user = await getUserDetails(userdata.uniqueId, "include", "name");

        if (user.result.length > 0) {
            output.error = "User exists";
            return output;
        }

        const hashedPassword = await bcrypt.hash(userdata.password, 10);
        
        await User.create({
            ...userdata,
            password: hashedPassword
        });

        output.result = "User created successfully";
    } catch (error) {
        console.error(error);
        output.error = "An error occured";
    }

    return output;
};