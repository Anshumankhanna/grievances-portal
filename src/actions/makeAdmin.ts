"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import User, { UserType } from "@/models/User";
import { OutputType } from "@/types/outputType";
import { Query } from "mongoose";
import { getServerSession } from "next-auth";

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

		const user: Query<any, any, {}, any, "findOne", {}> & UserType | null = await User.findOne({ uniqueId: session.user.uniqueId }).select("uniqueId name email mobile password complaints"); //eslint-disable-line

		if (user === null) {
			output.error = "Something went wrong";
			return output;
		}

		await Admin.create({
			uniqueId: user.uniqueId,
			name: user.name,
			email: user.email,
			mobile: user.mobile,
			password: user.password,
			complaints: user.complaints
		});
		await User.deleteOne({ uniqueId: user.uniqueId });
		console.log("Admin created successfully");
	} catch (error) {
		console.error(error);
		output.error = "Something went wrong";
	}

	return output;
}