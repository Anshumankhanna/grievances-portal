"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { OutputType } from "@/types/outputType";
import { RoleKeyType } from "@/types/roleTypes";
import { UserDataFillType } from "@/types/userTypes";
import bcrypt from "bcryptjs";

export const signup = async (userdata: UserDataFillType, role: RoleKeyType = "user"): Promise<OutputType<string>> => { //eslint-disable-line
    const { uniqueId, password } = userdata;
    const output: OutputType<string> = {
        error: null,
        result: ""
    };

    try {
        await connectDB();

        // const Model = role === "user"? User : "";        
        const user = await User.findOne({ uniqueId }).select("_id");

        if (user !== null) {
            output.error = "User exists";
            return output;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
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