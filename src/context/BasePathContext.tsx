"use client";

import { ChildrenType } from "@/types/childrenType";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type BasePathStateType = {
    basePath: string;
    setBasePath: Dispatch<SetStateAction<string>>;
}

export const BasePathValueContext = createContext<BasePathStateType | null>(null);

export default function BasePathContext({
    children
}: ChildrenType
): JSX.Element {
    const [basePath, setBasePath] = useState<string>("/");

    return (
        <BasePathValueContext.Provider value={{ basePath, setBasePath }}>
            {children}
        </BasePathValueContext.Provider>
    );
};

export function useBasePathContext(): BasePathStateType {
    const context = useContext(BasePathValueContext);

    if (context === null) {
        throw new Error("We have no context");
    }

    return context;
};