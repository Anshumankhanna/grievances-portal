export const Roles = {
    user: "u",
    admin: "a",
    devadmin: "d",
} as const;

export type RoleKeyType = keyof typeof Roles;
export type RoleValueType = (typeof Roles)[keyof typeof Roles];
export const RoleKeys: RoleKeyType[] = Object.keys(Roles) as RoleKeyType[];
export const RoleValues: RoleValueType[] = Object.values(Roles) as RoleValueType[];