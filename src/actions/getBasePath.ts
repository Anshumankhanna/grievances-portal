"use server";

import { connectDB } from "@/lib/mongodb";
import { OutputType } from "@/types/outputType";
import getUserDetails from "@/actions/getUserDetails";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function getBasePath(uniqueId?: string): Promise<OutputType<string>> {
	console.log("we entered function");
	const output: OutputType<string> = {
		error: null,
		result: ""
	};

	try {
		console.log("we tried");
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

		output.result = `${details.result[0].category === "student" || details.result[0].category === "teacher"? "u" : "a"}/${details.result[0].category[0]}/${uniqueId}`;
	} catch (error) {
		output.error = "Couldn't route";
		console.error(error);
	}

	console.log("we exited");
	
	return output;
};
