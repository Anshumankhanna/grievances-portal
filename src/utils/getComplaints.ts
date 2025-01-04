"use server";

import { connectDB } from "@/lib/mongodb";
import Complaint from "@/models/Complaint";
import { ComplaintDataAdminExtractType } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import fixForDate from "./fixForDate";

export default async function getComplaints(): Promise<OutputType<ComplaintDataAdminExtractType[]>> {
    const output: OutputType<ComplaintDataAdminExtractType[]> = {
        error: null,
        result: []
    };

    try {
        await connectDB();

        const complaints: ComplaintDataAdminExtractType[] | null = await Complaint
        .find()
        .populate({
            path: "user",
            select: "uniqueId name mobile email createAt"
        });

        if (complaints === null) {
            output.error = "Something went wrong";
            return output;
        }

        output.result = JSON.parse(JSON.stringify(complaints));
        fixForDate(output.result);
    } catch (error) {
        console.error(error);
        output.error = "Something went wrong";
    }

    return output;
}