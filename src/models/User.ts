import { RoleKeys, RoleKeyType } from "@/types/roleTypes";
import { CategoryKeys, CategoryKeyType } from "@/types/categoryTypes";
import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

export type UserType = {
    // this is necessary
    _id: ObjectId;
    role: RoleKeyType;
    category: CategoryKeyType;
    uniqueId: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
    complaints: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export type UserDocument = Document & UserType

const UserSchema = new Schema<UserType>(
    {
        role: {
            type: String,
            enum: RoleKeys,
            default: "user",
        },
        category: {
            type: String,
            enum: CategoryKeys,
            required: true,
        },
        uniqueId: {
            type: String,
            unique: true,
            required: true,
            // validate: {
            //     validator: function (value: number) {
            //         return enrollmentNumberRegex.test(value.toString());
            //     },
            //     message: "Enrollment number is invalid",
            // },
        },
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            // match: [
            //     emailRegex,
            //     "Email is invalid",
            // ],
        },
        mobile: {
            type: Number,
            required: true,
            // validate: {
            //     validator: function (value: number) {
            //         return value.toString().length === 10;
            //     },
            //     message: "Mobile number is invalid"
            // }
        },
        password: {
            type: String,
            required: true,
        },
        complaints: [
            {
                type: Schema.Types.ObjectId,
                ref: "Complaint",
            },
        ],
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`.
    }
);

const User = mongoose.models?.User || model<UserType>("User", UserSchema);

export default User;