import { connectDB } from "@/lib/mongodb";
import Complaint from "@/models/Complaint";
import { ComplaintDataFillType } from "@/types/complaintTypes";
import { OutputType } from "@/types/outputType";
import { getSession } from "next-auth/react";

export default async function addComplaint(complaintData: ComplaintDataFillType): Promise<OutputType<string>> {
    const output: OutputType<string> = {
        error: null,
        result: "",
    };
    const session = await getSession();

    if (session === null) {
        output.error = "An error occured";
        return output;
    }

    try {
        await connectDB();

        const complaint = new Complaint({
            user: session.user._id,
            ...complaintData
        });
    
        await complaint.save();
        output.result = "Complaint saved successfully";
    } catch (error) {
        console.error(error);
        output.error = "An error occured";
    }
    
    return output;
};