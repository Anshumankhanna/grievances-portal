// this function is for internal use only, it will never return the "_id" field as that field has too much data because it is "new ObjectId()"

"use server";

import { connectDB } from "@/lib/mongodb";
import { UserType } from "@/models/User";
import Admin, { AdminType } from "@/models/Admin";
import { OutputType } from "@/types/outputType";
import { PipelineStage } from "mongoose";

export default async function getUserDetails(uniqueId: string, command: "include" | "exclude" | "none", ...fields: (keyof UserType | AdminType)[]) {
	const output: OutputType<Partial<UserType | AdminType>[]> = {
		error: null,
		result: []
	};

	try {
		await connectDB();

		const pipeline: PipelineStage[] = [
			{ $unionWith: { coll: "users" } },
			{ $match: { uniqueId } }
		];

		if (command !== "none") {
			const projectFields = Object.fromEntries(fields.map(elem => [elem, command === "include"? 1 : 0]));

			projectFields["_id"] = 0;

			if (command === "exclude") {
				projectFields["__v"] = 0;
			}
			
			pipeline.push({ $project: projectFields });
		}

		const users = await Admin.aggregate(pipeline);

		if (users.length == 0) {
			output.error = "No user found";
			return output;
		}

		output.result = users;
	} catch (error) {
		output.error = "Something went wrong";
		console.error(error);
	}

	return output;
};