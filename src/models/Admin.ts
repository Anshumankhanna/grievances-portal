import mongoose, { Schema, model, Document } from "mongoose";
import { UserType } from "./User";

const AdminCategories = ["admin", "devadmin"] as const;
export type AdminCategoriesType = typeof AdminCategories[number];

export type AdminType = Omit<UserType, "role" | "category"> & {
	category: typeof AdminCategories[number];
}
export type AdminDocument = Document & AdminType

const AdminSchema = new Schema<AdminType>(
    {
        category: {
            type: String,
            enum: AdminCategories,
			default: "admin"
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

const Admin = mongoose.models?.Admin || model<AdminType>("Admin", AdminSchema);

export default Admin;