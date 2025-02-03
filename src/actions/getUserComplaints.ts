"use server";

import { connectDB } from "@/lib/mongodb";
import { ComplaintType } from "@/models";
import Complaint from "@/models/Complaint";
import User from "@/models/User";
import { OutputType } from "@/types/outputType";

export type ComplaintDataUserType = Pick<ComplaintType, "subject" | "description" | "status" | "createdAt">

export default async function getUserComplaints(uniqueId: string) {
	const output: OutputType<ComplaintDataUserType[]> = {
		error: null,
		result: []
	}

	try {
		await connectDB();

		const { complaints } = await User.findOne({ uniqueId }).select("complaints -_id").populate({
			path: "complaints",
			select: "subject description status createdAt -_id"
		});

		for (const complaint of complaints) {
			output.result.push({
				subject: complaint.subject,
				description: complaint.description,
				status: complaint.status,
				createdAt: complaint.createdAt 
			});
		}
	} catch (error) {
		output.error = "Can't get complaints right now";
		console.error(error);
	}

	return output;
};
