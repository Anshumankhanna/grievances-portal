"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const regex: RegExp = /^\/a\/d\/[0-9]{11}/;

type LinkStateType = {
    dashboard: boolean;
    profile: boolean;
    import: boolean;
    export: boolean;
    changeUserPassword: boolean;
}
const DefaultLinkState = {
    dashboard: false,
    profile: false,
    import: false,
    export: false,
    changeUserPassword: false
};

export default function AdminMenu() {
    const [linkState, setLinkState] = useState<LinkStateType>({ ...DefaultLinkState, dashboard: true });
    const { basePath } = useBasePathContext();
    const router = useRouter();
    const isDevAdminPath = regex.test(basePath);
    const currentPath = usePathname();
    
    useEffect(() => {
        (async () => {
            const session = await getSession();
            
            if (session === null) {
                router.push("/");
            }
        })();

        if (currentPath.endsWith("profile")) {
            setLinkState({ ...DefaultLinkState, profile: true });
        } else if (currentPath.endsWith("changeUserPassword")) {
            setLinkState({ ...DefaultLinkState, changeUserPassword: true });
        } else {
            setLinkState({ ...DefaultLinkState, dashboard: true });
        }
    }, [currentPath, router]);

    return (
        <div className="menu-div">
            <Link href={`${basePath}/`} className={linkState.dashboard? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, dashboard: true})}>
                Dashboard
            </Link>
            <Link href={`${basePath}/profile`} className={linkState.profile? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, profile: true})}>
                Profile
            </Link>
            {/* <Link href={`${basePath}/import`} className={linkState.import? "text-tertiary-color bg-panel-background" : "bg-tertiary-color text-panel-background"} onClick={() => setLinkState({...DefaultLinkState, import: true})}>
                Import
            </Link> */}
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