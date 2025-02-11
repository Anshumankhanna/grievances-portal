"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";
import { useState } from "react";

type LinkStateType = {
    dashboard: boolean;
    profile: boolean;
    import: boolean;
    changeUserPassword: boolean;
}
const DefaultLinkState = {
    dashboard: false,
    profile: false,
    import: false,
    changeUserPassword: false
};

export default function UserMenu() {
    const [linkState, setLinkState] = useState<LinkStateType>({ ...DefaultLinkState, dashboard: true });
    const { basePath } = useBasePathContext();

    return (
        <div className="menu-div">
            <Link href={`${basePath}/`} className={linkState.dashboard? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, dashboard: true})}>
                Dashboard
            </Link>
            <Link href={`${basePath}/profile`} className={linkState.profile? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, profile: true})}>
                Profile
            </Link>
        </div>
    )
}