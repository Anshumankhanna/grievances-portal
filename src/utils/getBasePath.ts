"use server";

import getUserDetails from "@/utils/getUserDetails";
import { Roles } from "@/types/roleTypes";
import { Categories } from "@/types/categoryTypes";
import makePath from "./makePath";
import { OutputType } from "@/types/outputType";
import { getServerSession } from "next-auth";

export default async function getBasePath(uniqueId?: string): Promise<OutputType<string>> {
    const output: OutputType<string> = {
        error: null,
        result: "",
    };

    if (uniqueId === undefined) {
        const session = await getServerSession();

        if (session === null) {
            output.error = "An error occured";
            return output;
        }
    
        const { user } = session;
        uniqueId = user.uniqueId;
    }

    const { error, result } = await getUserDetails(uniqueId, "role", "category");
            
    if (error !== null || result.role === undefined || result.category === undefined) {
        console.error(error);
        output.error = "An error occured";
    } else {
        output.result = makePath(Roles[result.role], Categories[result.category], uniqueId);
    }

    return output;
}