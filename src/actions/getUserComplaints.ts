"use server";

import { connectDB } from "@/lib/mongodb";
import { ComplaintType } from "@/models";
import User, { UserType } from "@/models/User";
import { OutputType } from "@/types/outputType";

export type ComplaintDataUserType = Pick<ComplaintType, "subject" | "description" | "status" | "createdAt">

export default async function getUserComplaints(uniqueId: string) {
	const output: OutputType<ComplaintDataUserType[]> = {
		error: null,
		result: []
	}

	try {
		await connectDB();

		const user = await User.findOne({ uniqueId }).select<Pick<UserType, "complaints">>("complaints -_id").populate<{ complaints: Pick<ComplaintType, "subject" | "description" | "status" | "createdAt">[] }>({
			path: "complaints",
			select: "subject description status createdAt -_id"
		});

		if (!user) {
			output.error = "Something went wrong";
			return output;
		}

		for (const complaint of user.complaints) {
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
