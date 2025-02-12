"use server";

import { connectDB } from "@/lib/mongodb";
import { OutputType } from "@/types/outputType";
import getUserDetails from "@/actions/getUserDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserCategories, UserCategoriesType } from "@/models";

export default async function getBasePath(uniqueId?: string): Promise<OutputType<string>> {
	const output: OutputType<string> = {
		error: null,
		result: ""
	};

	try {
		await connectDB();

		if (!uniqueId) {
			const session = await getServerSession(authOptions);

			if (!session) {
				output.error = "Trouble fetching the session";
				return output;
			}

			uniqueId = session.user.uniqueId;
		}
		
		const details = await getUserDetails(uniqueId, "include", "category");

		if (details.error) {
			output.error = details.error;
			return output;
		} else if (!details.result[0].category) {
			output.error = "Error fetching details";
			return output;
		}

		output.result = `/${UserCategories.includes(details.result[0].category as UserCategoriesType)? "u" : "a"}/${details.result[0].category[0]}/${uniqueId}`;
	} catch (error) {
		output.error = "Couldn't route";
		console.error(error);
	}

	
	return output;
};