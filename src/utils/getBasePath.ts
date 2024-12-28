"use server";

import { getSession } from "next-auth/react";
import getUserDetails from "@/utils/getUserDetails";
import { RoleKeyType, Roles } from "@/types/roleTypes";
import { Categories, CategoryKeyType } from "@/types/categoryTypes";
import makePath from "./makePath";
import { OutputType } from "@/types/outputType";

export default async function getBasePath(uniqueId?: string): Promise<OutputType<string>> {
    const output: OutputType<string> = {
        error: null,
        result: "",
    };

    if (uniqueId === undefined) {
        const session = await getSession();

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
        console.log(`Get user details result = ${result}`);
        output.result = makePath(Roles[result.role], Categories[result.category], uniqueId);
    }

    return output;
}