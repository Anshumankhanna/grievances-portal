"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const regex: RegExp = /^\/a\/d\/[0-9]{11}/;

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

export default function AdminMenu() {
    const [linkState, setLinkState] = useState<LinkStateType>({ ...DefaultLinkState, dashboard: true });
    const { basePath } = useBasePathContext();
    const isDevAdminPath = regex.test(basePath);
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
            <Link href={`${basePath}/import`} className={linkState.import? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, import: true})}>
                Import
            </Link>
            {/* <Link href={`${basePath}/export`}>
                Export
            </Link> */}
			{isDevAdminPath &&
                <Link href={`${basePath}/changeUserPassword`} className={linkState.changeUserPassword? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, changeUserPassword: true})}>
                    Change User Password
                </Link>
            }
        </div>
    )
}