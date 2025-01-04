import { StatusKeys, StatusKeyType } from "@/types/complaintTypes";
import mongoose, { model, ObjectId, Schema } from "mongoose";

export type ComplaintType = {
    // this is for mongodb.
    _id: ObjectId;
    user: ObjectId;
    subject: string;
    description: string;
    status: StatusKeyType;
    createdAt: Date;
    updatedAt: Date;
}
export type ComplaintDocument = Document & ComplaintType;

const ComplaintSchema = new Schema<ComplaintType>(
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
            enum: StatusKeys,
            default: "unresolved"
        }
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.models?.Complaint || model<ComplaintType>("Complaint", ComplaintSchema);

export default Complaint;