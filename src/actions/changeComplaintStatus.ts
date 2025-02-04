"use server";

import { connectDB } from "@/lib/mongodb";
import { StatusType } from "@/models";
import Complaint from "@/models/Complaint";
import { OutputType } from "@/types/outputType";

export default async function changeComplaintStatus(createdAt: Date, status: StatusType): Promise<OutputType<boolean>> {
	const output: OutputType<boolean> = {
		error: null,
		result: false
	};

	try {
		await connectDB();
		await Complaint.updateOne({ createdAt }, { $set: { status }});

		output.result = true;
	} catch (error) {
		output.error = "Couldn't change complaint status";
		console.error(error);
	}
	
	return output;
};