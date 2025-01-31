import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		await connectDB();

	} catch (error) {
		console.error(error);
		console.log("Didn't connect");
	}

	return NextResponse.redirect(new URL("/", req.url))
}