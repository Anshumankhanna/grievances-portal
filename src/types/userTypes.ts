import { UserDocument } from "@/models/User";
import { ComplaintDataUserExtractType } from "./complaintTypes";

export type SessionUserFields = Pick<UserDocument, "_id" | "uniqueId">;
export type TokenUserFields = Omit<UserDocument, "password">;
export type UserDataUserExtractType = Omit<UserDocument, "complaints"> & {
    complaints: ComplaintDataUserExtractType[];
}
export type UserDataAdminExtractType = Pick<UserDocument, "uniqueId" | "name" | "email" | "mobile">;

