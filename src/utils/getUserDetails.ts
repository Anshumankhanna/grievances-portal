"use server";

import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import { ComplaintDetails } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import { UserDataFields } from "@/types/userTypes";

type resultType = Partial<UserDataFields>;

export default async function getUserDetails(uniqueId: string, ...details: (keyof UserDocument)[]): Promise<OutputType<resultType>> {
    const output: OutputType<resultType> = {
        error: null,
        result: {},
    }

    try {
        await connectDB();

        const user = details.includes("complaints")? await User
        .findOne({ uniqueId })
        .select(details.join(" "))
        .populate({
            path: "complaints",
            select: ComplaintDetails,
        }):
        await User.findOne({ uniqueId })
        .select(details.join(" "));

        console.log(user);
        
        if (user === null) {
            output.error = "An error occured in finding user";
        } else {
            for (const key of details) {
                output.result[key as keyof resultType] = user[key];
            }

            console.log(output.result);
        }
    } catch (error) {
        console.error(error);
        output.error = "An error occured in catch";
    }

    return output;
}