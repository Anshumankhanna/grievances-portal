import { ComplaintType } from "@/models/Complaint";
import { UserDataProfileType } from "./userTypes";

export const Statuses = {
    unresolved: "unresolved",
    resolved: "resolved",
} as const;
export const StatusColor = {
    unresolved: "#dc2626",
    resolved: "#22c55e",
} as const;

export type StatusKeyType = keyof typeof Statuses;
export type StatusValueType = (typeof Statuses)[keyof typeof Statuses];
export const StatusKeys: StatusKeyType[] = Object.keys(Statuses) as StatusKeyType[];
export const StatusValues: StatusValueType[] = Object.values(Statuses) as StatusValueType[];

export const ComplaintDetailsArray: (keyof ComplaintType)[] = ["subject", "description", "createdAt", "status"];
export const ComplaintDetailsString = ComplaintDetailsArray.join(" ");
export type ComplaintDataFillType = Pick<ComplaintType, "subject" | "description">;

export type ComplaintDataUserExtractType = ComplaintDataFillType & {
    _id: string;
    status: StatusKeyType;
    createdAt: Date;
}

export type ComplaintDataAdminExtractType = Omit<ComplaintType, "user"> & {
    user: UserDataProfileType
}
export const Keys: (keyof ComplaintDataAdminExtractType)[] = ["user"];