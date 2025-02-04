"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { AdminCategories, AdminCategoriesType } from "@/models";
import { OutputType } from "@/types/outputType";
import { randomBytes } from "crypto";
import { getServerSession } from "next-auth";
import getUserDetails from "./getUserDetails";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs"
import User from "@/models/User";

// this function will be used in three ways:
// 1) When both 'uniqueId' and 'password' are known - Forceful change password of a user by admin
// 2) When only 'password' is known, change password of a user by themselves
// 3) When only 'uniqueId' is known, forgot password thing will be done
// For 1) and 2) we only return a 'success message' for 3) we return the new password
// ** 1) should be on a route that can only be accessed by a devadmin

export default async function changePassword(uniqueId?: string, password?: string): Promise<OutputType<string>> {
	const output: OutputType<string> = {
		error: null,
		result: "Password changed successfully"
	};

	if (!password) {
		password = randomBytes(10).toString("hex").slice(0, 10);
		output.result = password;
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		if (!uniqueId) {
			const session = await getServerSession(authOptions);
	
			if (!session) {
				output.error = "Couldn't change the password";
				return output;
			}

			uniqueId = session.user.uniqueId;
		}

		await connectDB();

		const details = await getUserDetails(uniqueId, "include", "category");

		if (details.error || !details.result[0].category) {
			output.error = "Couldn't change the password";
			return output;
		}

		const category = details.result[0].category;

		if (AdminCategories.includes(category as AdminCategoriesType)) {
			await Admin.updateOne({ uniqueId }, { $set: { password: hashedPassword } });
		} else {
			await User.updateOne({ uniqueId }, { $set: { password: hashedPassword } });
		}
	} catch (error) {
		console.error(error);
	}
	
	return output;
};