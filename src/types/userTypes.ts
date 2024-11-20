export const UserType = {
    s: "Student",
    p: "Parent",
    t: "Teacher",
} as const;

// export type UserValueType = (typeof UserType)[keyof typeof UserType];
export type UserKeyType = keyof typeof UserType;