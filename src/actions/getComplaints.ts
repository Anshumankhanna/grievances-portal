"use server";

import { connectDB } from "@/lib/mongodb";
import { UserType } from "@/models";
import Complaint, { ComplaintType } from "@/models/Complaint";
import { OutputType } from "@/types/outputType";

const UserFieldsToFetch = ["category", "uniqueId", "name", "mobile", "email", "createdAt"] as const;
type UserFieldsToFetchType = typeof UserFieldsToFetch[number];

export type ComplaintDataAdminType = Pick<ComplaintType, "subject" | "description" | "status" | "createdAt"> & {
    user: Pick<UserType, UserFieldsToFetchType>
}

export default async function getComplaints(): Promise<OutputType<ComplaintDataAdminType[]>> {
    const output: OutputType<ComplaintDataAdminType[]> = {
        error: null,
        result: []
    };

    try {
        await connectDB();

        const complaints = await Complaint
        .find()
        .select<Omit<ComplaintType, "_id">>("-_id -__v")
        .populate<{ user: Pick<UserType, UserFieldsToFetchType> }>({
            path: "user",
            select: UserFieldsToFetch.join(" ")
        });

        if (complaints === null) {
            output.error = "Something went wrong";
            return output;
        }

        for (const complaint of complaints) {
            output.result.push({
                user: {
                    category: complaint.user.category,
                    uniqueId: complaint.user.uniqueId,
                    name: complaint.user.name,
                    email: complaint.user.email,
                    mobile: complaint.user.mobile,
                    createdAt: complaint.user.createdAt,
                },
                subject: complaint.subject,
                description: complaint.description,
                status: complaint.status,
                createdAt: complaint.createdAt
            })
        }
    } catch (error) {
        console.error(error);
        output.error = "Something went wrong";
    }

    return output;
}