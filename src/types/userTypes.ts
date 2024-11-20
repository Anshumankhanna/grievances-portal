export const UserType = {
    s: "Student",
    p: "Parent",
    t: "Teacher",
} as const;

export type UserProfile = {
    photo: string;
    enrollNo: number;
    name: string;
    motherName: string;
    fatherName: string;
    address: string;
    phoneNumber: string;
    branch: string;
    yearOfGraduation: number;
};
// export type UserValueType = (typeof UserType)[keyof typeof UserType];
export type UserKeyType = keyof typeof UserType;
