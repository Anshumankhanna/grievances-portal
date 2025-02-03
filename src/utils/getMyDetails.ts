// Don't use this function to get complaints data as it won't be populated

"use server";

import { OutputType } from "@/types/outputType";
import getUserDetails from "@/actions/getUserDetails";
import { getServerSession } from "next-auth";
import { UserType } from "@/models/User";
import { AdminType } from "@/models/Admin";
import { authOptions } from "@/lib/auth";

export default async function getMyDetails(...fields: (keyof UserType | AdminType)[]): Promise<OutputType<Partial<UserType | AdminType>>> {
    const output: OutputType<Partial<UserType | AdminType>> = {
        error: null,
        result: {},
    }

    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            output.error = "Can't fetch my details";
            return output;
        }

        const { error, result } = await getUserDetails(session.user.uniqueId, "include", ...fields);
        
        if (error) {
            output.error = "Can't fetch my details";
            return output;
        }

        output.result = result[0];
    } catch (error) {
        console.error(error);
        output.error = "Can't fetch my details";
    }
    
    return output;
}