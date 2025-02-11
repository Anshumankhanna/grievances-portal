"use server";

import { connectDB } from "@/lib/mongodb";
import { OutputType } from "@/types/outputType";
import { UserDataFillType } from "@/actions/signup";
import User from "@/models/User";
import { ComplaintDataFillType } from "@/actions/addComplaint";
import bcrypt from "bcryptjs";
import Complaint from "@/models/Complaint";
import getUserDetails from "./getUserDetails";

// const UserRequiredKeys = ["category", "uniqueId", "name", "email", "mobile", "password"] as const;
// const ComplaintRequiredKeys = ["user", "subject", "description"] as const;

type CustomUserDataFillType = UserDataFillType & {
	createdAt: Date
};
type CustomComplaintDataFillType = ComplaintDataFillType & {
	createdAt: Date
};

export default async function importUserData(model: "user" | "complaint", data: Record<string, any>): Promise<OutputType<string[]>> { // eslint-disable-line
	const output: OutputType<string[]> = {
		error: null,
		result: []
	};

	try {
		await connectDB();
		
		if (model === "user") {
			output.result = await Promise.all(
				Object.values(data).map(async (row: Partial<CustomUserDataFillType>) => {
					if (row.category && row.uniqueId && row.name && row.email && row.mobile && row.password && row.createdAt) {
						try {
							const user = await getUserDetails(row.uniqueId, "include", "name");

							if (user.result.length > 0) {
								return `${row.uniqueId} already exists`;
							}

							const hashedPassword = await bcrypt.hash(row.password, 10);
		
							await User.create({
								category: row.category,
								uniqueId: row.uniqueId,
								name: row.name,
								email: row.email,
								mobile: row.mobile,
								password: hashedPassword,
								createdAt: row.createdAt
							});
						} catch (error) {
							return (error as Error).message;
						}
					}

					return "Success";
				})
			);
		} else {
			output.result = await Promise.all(
				Object.values(data).map(async (row: Partial<CustomComplaintDataFillType & { uniqueId: string; }>) => {
					if (row.description && row.subject && row.uniqueId && row.createdAt) {
						try {
							const user = await User.findOne({ uniqueId: row.uniqueId }).select("_id complaints");
							
							if (!user) {
								return `${row.uniqueId} doesn't exist`;
							}
		
							const complaint = new Complaint({
								user: user._id,
								subject: row.subject,
								description: row.description,
								createdAt: row.createdAt
							});
		
							user.complaints.push(complaint._id);
		
							await complaint.save();
							await user.save();
						} catch (error) {
							return (error as Error).message;
						}
					}

					return "Sucess";
				})
			)
		}
	} catch (error) {
		output.error = "Couldn't import data";
		console.error(error);
	}
	
	return output;
};
