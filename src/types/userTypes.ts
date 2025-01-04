import { UserType } from "@/models/User";
import { ComplaintDataUserExtractType } from "./complaintTypes";


export type SessionUserFields = Pick<UserType, "_id" | "uniqueId"> & {
    basePath: string;
};
export type TokenUserFields = Omit<UserType, "password">;

export type UserDataLoginType = {
    uniqueId: string;
    password: string;
};
export const UserDataLoginDefault: UserDataLoginType = {
    uniqueId: "",
    password: "",
};

export type UserDataFillType = {
    category: string;
    uniqueId: string;
    name: string;
    email: string;
    mobile: number;
    password: string;
}
export const UserDataFillDefault: UserDataFillType = {
    category: "select",
    uniqueId: "",
    name: "",
    email: "",
    mobile: 0,
    password: "",
};

export type UserDataUserExtractType = Omit<UserType, "password" | "complaints"> & {
    complaints: ComplaintDataUserExtractType[];
}
export type UserDataDashboardType = Pick<UserDataUserExtractType, "_id" | "uniqueId" | "name" | "complaints">;
export type UserDataAdminDashboardType = Omit<UserDataDashboardType, "complaints">;
export type UserDataProfileType = Pick<UserDataUserExtractType, "_id" | "uniqueId" | "name" | "email" | "mobile" | "createdAt">;
