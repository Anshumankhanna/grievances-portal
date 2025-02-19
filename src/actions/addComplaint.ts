"use server";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Complaint, { ComplaintType } from "@/models/Complaint";
import User, { UserType } from "@/models/User";
import { OutputType } from "@/types/outputType";
import { getServerSession } from "next-auth";

export type ComplaintDataFillType = Pick<ComplaintType, "subject" | "description">;

export default async function addComplaint(complaintData: ComplaintDataFillType): Promise<OutputType<string>> {
    const output: OutputType<string> = {
        error: null,
        result: "",
    };

    // Use the session cookie to retrieve the session
    const session = await getServerSession(authOptions);

    if (session === null) {
        output.error = "Session not found";
        return output;
    }

    try {
        await connectDB();
        
        const user = await User.findOne({ uniqueId: session.user.uniqueId }).select<Pick<UserType, "_id" | "complaints">>("_id complaints");
        
        if (user === null) {
            output.error = "User not found";
            return output;
        }

        const complaint = new Complaint({
            user: user._id,
            ...complaintData
        });

        user.complaints.push(complaint._id);

        await complaint.save();
        await user.save();

        output.result = "Complaint saved successfully";
    } catch (error) {
        console.error(error);
        output.error = "An error occured";
    }
    
    return output;
};