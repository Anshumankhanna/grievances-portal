"use server";

import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import { ComplaintDetails } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import { UserDataFields } from "@/types/userTypes";

export default async function getUserDetails(uniqueId: string, ...details: (keyof UserDocument)[]): Promise<OutputType<Partial<UserDataFields>>> {
    const output: OutputType<Partial<UserDataFields>> = {
        error: null,
        result: {},
    }

    try {
        await connectDB();

        const user = await User
        .findOne({ uniqueId })
        .select(details.join(" "));
        // .populate({
        //     path: "complaints",
        //     select: ComplaintDetails,
        // });
        
        if (user === null) {
            output.error = "An error occured in finding user";
        } else {
            const plainUser = user.toObject();

            // Map or transform data if needed, particularly for fields like `_id` and `complaints`
            output.result = {
                ...plainUser,
                _id: plainUser._id.toString(),
            };
        }
    } catch (error) {
        console.error(error);
        output.error = "An error occured in catch";
    }

    return output;
}