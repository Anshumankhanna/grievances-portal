import { RoleKeys, RoleKeyType } from "@/types/roleTypes";
import { CategoryKeys, CategoryKeyType } from "@/types/categoryTypes";
import mongoose,    { Schema, model } from "mongoose";

export interface UserDocument {
    // putting an 'id' is compulsory, otherwise Next.js becomes a baby.
    id: string;
    // this is necessary
    _id: Schema.Types.ObjectId;
    role: RoleKeyType;
    category: CategoryKeyType;
    uniqueId: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
    complaints: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
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

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);

export default User;