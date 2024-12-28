import { ComplaintDocument } from "@/models/Complaint";
import { UserDataAdminExtractType } from "./userTypes";

export const Statuses = {
    unresolved: "unresolved",
    resolved: "resolved",
} as const;

export type StatusKeyType = keyof typeof Statuses;
export type StatusValueType = (typeof Statuses)[keyof typeof Statuses];
export const StatusKeys: StatusKeyType[] = Object.keys(Statuses) as StatusKeyType[];
export const StatusValues: StatusValueType[] = Object.values(Statuses) as StatusValueType[];

export const ComplaintDetails = "subject description createdAt status";
export type ComplaintDataFillType = Pick<ComplaintDocument, "subject" | "description">;

export type ComplaintDataUserExtractType = ComplaintDataFillType & {
    status: StatusKeyType;
    createdAt: Date;
}

export type ComplaintDataAdminExtractType = ComplaintDataUserExtractType & {
    user: UserDataAdminExtractType;
}