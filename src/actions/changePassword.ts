"use server";

import { connectDB } from "@/lib/mongodb";
import { OutputType } from "@/types/outputType";

// this function will be used in three ways:
// 1) When both 'uniqueId' and 'password' are known - Forceful change password of a user by admin
// 2) When only 'password' is known, change password of a user by themselves
// 3) When only 'uniqueId' is known, forgot password thing will be done
// For 1) and 2) we only return a 'success message' for 3) we return the new password
// ** 1) should be on a route that can only be accessed by a devadmin
export default async function changePassword(uniqueId?: string, password?: string): Promise<OutputType<string>> {
	const output: OutputType<string> = {
		error: null,
		result: ""
	};

	try {
		await connectDB();

		// write code here
	} catch (error) {
		console.error(error);
	}
	
	return output;
};