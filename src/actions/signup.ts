"use server";

import { UserData } from "@/app/signup/page";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { OutputType } from "@/types/outputType";
import bcrypt from "bcryptjs";

export const signup = async (userdata: UserData): Promise<OutputType<string>> => {
    const { uniqueId, password } = userdata;
    const output: OutputType<string> = {
        error: null,
        result: ""
    };

    try {
        await connectDB();

        const user = await User.findOne({ uniqueId }).select("_id");

        if (user !== null) {
            output.error = "User exists";
            return output;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            ...userdata,
            password: hashedPassword
        });
        
        await newUser.save();
        output.result = "User created successfully";
    } catch (error) {
        console.error(error);
        output.error = "An error occured";
    }

    return output;
};