export const Categories = {
    student: "s",
    teacher: "t",
} as const;

export type CategoryKeyType = keyof typeof Categories;
export type CategoryValueType = (typeof Categories)[keyof typeof Categories];
export const CategoryKeys: CategoryKeyType[] = Object.keys(Categories) as CategoryKeyType[];
export const CategoryValues: CategoryValueType[] = Object.values(Categories) as CategoryValueType[];