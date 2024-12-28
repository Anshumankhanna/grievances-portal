import { UserDocument } from "@/models/User";
import { ComplaintDataUserExtractType } from "./complaintTypes";

export type TokenUserFields = Omit<UserDocument, "password">;
export type UserDataFields = Omit<UserDocument, "_id" | "complaints"> & {
    _id: string
    complaints: ComplaintDataUserExtractType[];
}

export type UserDataAdminExtractType = Pick<UserDocument, "uniqueId" | "name" | "email" | "mobile">;