export const AdminModel = {
    a: "Admin",
    d: "Developer Admin",
} as const;

export type AdminKeyType = keyof typeof AdminModel;