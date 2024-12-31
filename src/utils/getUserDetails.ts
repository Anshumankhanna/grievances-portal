"use server";

import { connectDB } from "@/lib/mongodb";
import User, { UserDocument } from "@/models/User";
import { ComplaintDetailsString } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import { UserDataUserExtractType } from "@/types/userTypes";

type resultType = Partial<UserDataUserExtractType>;

export default async function getUserDetails(uniqueId: string, ...details: (keyof UserDocument)[]): Promise<OutputType<resultType>> {
    const output: OutputType<resultType> = {
        error: null,
        result: {},
    }

    try {
        await connectDB();

        const user: UserDocument | UserDataUserExtractType | null = await User
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

        output.result = JSON.parse(JSON.stringify(user as unknown as UserDataUserExtractType));
    } catch (error) {
        console.error(error);
        output.error = "An error occured in catch";
    }

    return output;
}