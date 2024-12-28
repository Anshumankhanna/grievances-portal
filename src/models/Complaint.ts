import { StatusKeys, StatusKeyType } from "@/types/complaintTypes";
import mongoose, { model, Schema } from "mongoose";

export type ComplaintDocument = {
    // this is for next js,
    id: string;
    // this is for mongodb.
    _id: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    subject: string;
    description: string;
    status: StatusKeyType;
    createdAt: Date;
    updatedAt: Date;
}

const ComplaintSchema = new Schema<ComplaintDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            // enum: StatusKeys,
            default: "unresolved"
        }
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.models?.Complaint || model<ComplaintDocument>("Complaint", ComplaintSchema);

export default Complaint;