import mongoose, { Model, model, ObjectId, Schema } from "mongoose";

export const StatusValues = ["unresolved", "resolved"] as const;
export type StatusType = typeof StatusValues[number];
export type ComplaintType = {
    // this is for mongodb.
    _id: ObjectId;
    user: ObjectId;
    subject: string;
    description: string;
    status: StatusType;
    createdAt: Date;
    updatedAt: Date;
}
export type ComplaintKeyType = keyof ComplaintType;
export type ComplaintDocument = Document & ComplaintType;
export const ComplaintKeys: ComplaintKeyType[] = ["_id", "user", "subject", "description", "status", "createdAt", "updatedAt"]

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
            enum: StatusValues,
            default: "unresolved"
        }
    },
    {
        timestamps: true,
    }
);

const Complaint = mongoose.models?.Complaint as Model<ComplaintType> || model<ComplaintType>("Complaint", ComplaintSchema);

export default Complaint;