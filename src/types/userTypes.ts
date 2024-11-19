export const UserModel = {
    s: "Student",
    p: "Parent",
    t: "Teacher",
} as const;

// export type UserValueType = (typeof UserModel)[keyof typeof UserModel];
export type UserKeyType = keyof typeof UserModel;