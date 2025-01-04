"use server";

import { connectDB } from "@/lib/mongodb";
import User, { UserDocument, UserType } from "@/models/User";
import { ComplaintDetailsString } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import { UserDataUserExtractType } from "@/types/userTypes";
import fixForDate from "./fixForDate";
import { Query } from "mongoose";

type resultType = Partial<UserDataUserExtractType>;

export default async function getUserDetails(uniqueId: string, ...details: (keyof UserDocument)[]): Promise<OutputType<resultType>> {
    const output: OutputType<resultType> = {
        error: null,
        result: {},
    }

    try {
        await connectDB();

        // Query allows the property 'populate'
        const user: (Query<unknown, unknown> & Partial<UserType | UserDataUserExtractType>) | null = await User
        .findOne({ uniqueId })
        .select(details.join(" "));
        
        if (user === null) {
            output.error = "An error occured in finding user";
            return output;
        }
        if (details.includes("complaints")) {
            await user.populate({
                path: "complaints",
                select: ComplaintDetailsString
            });
        }

        output.result = (JSON.parse(JSON.stringify(user)));
        fixForDate(output.result);
    } catch (error) {
        console.error(error);
        output.error = "An error occured in catch";
    }
    
    return output;
}