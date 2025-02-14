"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type LinkStateType = {
    dashboard: boolean;
    profile: boolean;
}
const DefaultLinkState: LinkStateType = {
    dashboard: false,
    profile: false
};

export default function UserMenu() {
    const [linkState, setLinkState] = useState<LinkStateType>({ ...DefaultLinkState, dashboard: true });
    const { basePath } = useBasePathContext();
    const currentPath = usePathname();

    useEffect(() => {
        if (currentPath.endsWith("profile")) {
            setLinkState({...DefaultLinkState, profile: true});
        }
    }, []);  // eslint-disable-line

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