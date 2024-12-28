export const Admins = {
    admin: "a",
    devadmin: "d",
} as const;

export type AdminKeyType = keyof typeof Admins;
export type AdminValueType = (typeof Admins)[keyof typeof Admins];
export const AdminKeys: AdminKeyType[] = Object.keys(Admins) as AdminKeyType[];
export const AdminValues: AdminValueType[] = Object.values(Admins) as AdminValueType[];