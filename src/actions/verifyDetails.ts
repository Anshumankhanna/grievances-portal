"use server";

import { connectDB } from "@/lib/mongodb";
// we can only verify things like "email", "mobile", "password" and "name"

import { AdminType, UserType } from "@/models";
import { OutputType } from "@/types/outputType";
import getUserDetails from "./getUserDetails";
import bcrypt from "bcryptjs";

export type VerifiableDetailsType = Pick<UserType | AdminType, "name" | "email" | "mobile" | "password">;

export default async function verifyDetails(uniqueId: string, details: Partial<VerifiableDetailsType>): Promise<OutputType<boolean>> {
	const output: OutputType<boolean> = {
		error: null,
		result: true
	};

	try {
		await connectDB();

		const validDetails = Object.keys(details)
			.filter(detail =>
				details[detail as keyof Partial<VerifiableDetailsType>] !== undefined
			) as unknown as (keyof UserType | keyof AdminType)[];
		const userDetails = await getUserDetails(uniqueId, "include", ...validDetails);

		if (userDetails.error) {
			output.error = "Couldn't verify the details";
			return output;
		}

		for (const key in userDetails.result[0]) {
			if (!Object.hasOwn(details, key)) {
				continue;
			}

			const actualValue = details[key as keyof VerifiableDetailsType];
			const expectedValue = userDetails.result[0][key as keyof (UserType | AdminType)];

			if (key === "password") {
				const isSame: boolean = await bcrypt.compare(actualValue as string, expectedValue as string);

				if (!isSame) {
					output.result = false;
				}
			} else if (actualValue !== expectedValue) {
				output.result = false;
			}
		}
	} catch (error) {
		console.error(error);
	}
	
	return output;
};
