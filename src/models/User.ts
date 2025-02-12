import mongoose, { Schema, model, Document, ObjectId } from "mongoose";

export const UserCategories = ["student", "parent", "teacher"] as const;
export type UserCategoriesType = typeof UserCategories[number];

export type UserType = {
    _id: ObjectId; // this is necessary
    category: UserCategoriesType;
    uniqueId: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
    complaints: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export type UserKeyType = keyof UserType;
export type UserDocument = Document & UserType
export const UserKeys: UserKeyType[] = ["_id", "category", "uniqueId", "name", "email", "mobile", "password", "complaints", "createdAt", "updatedAt"]

const UserSchema = new Schema<UserType>(
    {
        category: {
            type: String,
            enum: UserCategories,
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