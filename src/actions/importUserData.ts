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

export default async function importUserData(model: "user" | "complaint", data: Record<string, any>): Promise<OutputType<boolean>> { // eslint-disable-line
	const output: OutputType<boolean> = {
		error: null,
		result: false
	};

	try {
		await connectDB();
		
		if (model === "user") {
			await (new Promise(async (res) => {
				await Promise.all(
					Object.values(data).map(async (row: Partial<UserDataFillType>) => {
						output.result = false;

						if (row.category && row.uniqueId && row.name && row.email && row.mobile && row.password) {
							const user = await getUserDetails(row.uniqueId, "include", "name");

							if (user.result.length > 0) {
								output.error = `User already exists with ${row.uniqueId}`;
								return ;
							}

							const hashedPassword = await bcrypt.hash(row.password, 10);
		
							await User.create({
								category: row.category,
								uniqueId: row.uniqueId,
								name: row.name,
								email: row.email,
								mobile: row.mobile,
								password: hashedPassword
							});
		
							output.result = true;
						}
					})
				);

				if (output.result) {
					res("Sucess");
				}
			}));
		} else {
			await (new Promise(async (res) => {
				await Promise.all(
					Object.values(data).map(async (row: Partial<ComplaintDataFillType & { uniqueId: string; }>) => {
						output.result = false;
	
						if (row.description && row.subject && row.uniqueId) {
							const user = await User.findOne({ uniqueId: row.uniqueId }).select("_id complaints");
							
							if (!user) {
								output.error = `User not found for ${row.uniqueId}`;
								return ;
							}
		
							const complaint = new Complaint({
								user: user._id,
								subject: row.subject,
								description: row.description
							});
		
							user.complaints.push(complaint._id);
		
							await complaint.save();
							await user.save();
		
							output.result = true;
						}
					})
				)

				if (output.result) {
					res("Sucess");
					return ;
				}
			}));
		}
	} catch (error) {
		output.error = "Couldn't import data";
		console.error(error);
	}
	
	return output;
};
