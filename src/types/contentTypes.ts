export const ContentType = {
    d: "dashboard",
    p: "profile",
} as const;

export type ContentKeyType = keyof typeof ContentType;
export type ContentValueType = (typeof ContentType)[ContentKeyType];