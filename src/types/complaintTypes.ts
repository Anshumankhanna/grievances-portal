import { ComplaintDocument } from "@/models/Complaint";
import { UserDataAdminExtractType } from "./userTypes";

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

export const ComplaintDetailsArray: (keyof ComplaintDocument)[] = ["subject", "description", "createdAt", "status"];
export const ComplaintDetailsString = ComplaintDetailsArray.join(" ");
export type ComplaintDataFillType = Pick<ComplaintDocument, "subject" | "description">;

export type ComplaintDataUserExtractType = ComplaintDataFillType & {
    _id: string;
    status: StatusKeyType;
    createdAt: Date;
}

export type ComplaintDataAdminExtractType = ComplaintDataUserExtractType & {
    user: UserDataAdminExtractType;
}