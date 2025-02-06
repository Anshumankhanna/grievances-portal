"use client";

import BasePathContext from "@/context/BasePathContext";
import { SessionProvider } from "next-auth/react";

type Props = {
    children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
    return <SessionProvider>
        <BasePathContext>
            {children}
        </BasePathContext>
    </SessionProvider>;
};