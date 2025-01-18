import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	try {
		await connectDB();

		const password = await bcrypt.hash("abcd", 10);

		await User.create({
			category: "student",
			uniqueId: "03515002821",
			name: "a",
			email: "a@gmail.com",
			mobile: 9999999999,
			password
		});

		console.log("YAYYYY");
	} catch (error) {
		console.error(error);
		console.log("Didn't connect");
	}

	return NextResponse.redirect(new URL("/", req.url))
}