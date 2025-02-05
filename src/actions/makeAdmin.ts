"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import User from "@/models/User";
import { OutputType } from "@/types/outputType";
import { getServerSession } from "next-auth";
import getUserDetails from "@/actions/getUserDetails";
import Complaint from "@/models/Complaint";

const { ADMIN_KEY } = process.env;

export default async function makeAdmin(adminKey: string): Promise<OutputType<string>> {
	const output: OutputType<string> = {
		error: null,
		result: ""
	};

	if (adminKey !== ADMIN_KEY) {
		output.error = "Something went wrong";
		return output;
	}

	const session = await getServerSession(authOptions);

	if (session === null) {
		output.error = "Something went wrong";
		return output;
	}

	try {
		await connectDB();

		const { error, result: users } = await getUserDetails(session.user.uniqueId, "include", "category", "uniqueId", "name", "email", "mobile", "password", "complaints");

		if (users[0].complaints) {
			await Promise.all(users[0].complaints.map(async (elem) => {
				await Complaint.deleteOne({ _id: elem });
			}));
		}
		
		if (error) {
			output.error = error;
			return output;
		}
		
		await Admin.create({
			uniqueId: users[0].uniqueId,
			name: users[0].name,
			email: users[0].email,
			mobile: users[0].mobile,
			password: users[0].password
		});
		await User.deleteOne({ uniqueId: users[0].uniqueId });
		
		output.result = "Admin created successfully";
	} catch (error) {
		console.error(error);
		output.error = "Something went wrong";
	}

	return output;
}