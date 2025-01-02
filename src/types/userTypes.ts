import { UserDocument } from "@/models/User";
import { ComplaintDataUserExtractType } from "./complaintTypes";


export type SessionUserFields = Pick<UserDocument, "_id" | "uniqueId"> & {
    basePath: string;
};
export type TokenUserFields = Omit<UserDocument, "password">;
export type UserDataUserExtractType = Omit<UserDocument, "password" | "complaints"> & {
    complaints: ComplaintDataUserExtractType[];
}
export type UserDataAdminExtractType = Pick<UserDocument, "_id" | "uniqueId" | "name" | "email" | "mobile">;

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

export type UserDataDashboardType = Pick<UserDataUserExtractType, "uniqueId" | "name" | "complaints">;
export const UserDataDashboardDefault: UserDataDashboardType = {
    uniqueId: "",
    name: "",
    complaints: [],
};

export type UserDataProfileType = Pick<UserDataUserExtractType, "uniqueId" | "name" | "email" | "mobile" | "createdAt">;
export const UserDataProfileDefault: UserDataProfileType = {
    uniqueId: "",
    name: "",
    email: "",
    mobile: 0,
    createdAt: {} as Date,
}

