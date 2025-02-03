"use server";

import { connectDB } from "@/lib/mongodb";
import { UserType } from "@/models";
import Complaint, { ComplaintType } from "@/models/Complaint";
import { OutputType } from "@/types/outputType";

export type ComplaintDataAdminType = Pick<ComplaintType, "subject" | "description" | "status" | "createdAt"> & {
    user: Pick<UserType, "uniqueId" | "name" | "email" | "mobile" | "createdAt">
}

export default async function getComplaints(): Promise<OutputType<ComplaintDataAdminType[]>> {
    const output: OutputType<ComplaintDataAdminType[]> = {
        error: null,
        result: []
    };

    try {
        await connectDB();

        const complaints: ComplaintDataAdminType[] | null = await Complaint
        .find()
        .populate({
            path: "user",
            select: "uniqueId name mobile email createdAt"
        })
        .select("-_id -__v");

        if (complaints === null) {
            output.error = "Something went wrong";
            return output;
        }

        for (const complaint of complaints) {
            output.result.push({
                user: {
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