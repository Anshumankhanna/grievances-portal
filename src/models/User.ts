import { UserType } from "@/types/userTypes";
import { emailRegex, enrollmentNumberRegex } from "@/utils/regex";
import { Schema, model } from "mongoose";

export type UserDocument = {
    // putting an 'id' is compulsory, otherwise Next.js becomes a baby.
    id: string;
    access: string;
    enrollmentNumber: number;
    fullname: string;
    email: string;
    mobile: number;
    password: string;
    profilePicture: string;
    complaints: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
    {
        access: {
            type: String,
            enum: Object.values(UserType),
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                emailRegex,
                "Email is invalid",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: [true, "Name is required"],
        },
        enrollmentNumber: {
            type: Number,
            unique: true,
            required: true,
            validate: {
                validator: function (value: number) {
                    return enrollmentNumberRegex.test(value.toString());
                },
                message: "Enrollment number is invalid",
            },
        },
        mobile: {
            type: Number,
            required: true,
            validate: {
                validator: function (value: number) {
                    return value.toString().length === 10;
                },
                message: "Mobile number is invalid"
            }
        },
        profilePicture: {
            type: String,
            default: "",
        },
        complaints: [
            {
                type: Schema.Types.ObjectId,
                ref: "complaint",
            },
        ],
    },
    {
        timestamps: true, // Automatically creates `createdAt` and `updatedAt`.
    }
);

export default model<UserDocument>("User", UserSchema);