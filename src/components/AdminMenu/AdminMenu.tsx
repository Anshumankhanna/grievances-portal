"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";

const regex: RegExp = /^\/a\/d\/[0-9]{11}/;

export default function AdminMenu() {
    const { basePath } = useBasePathContext();
    const isDevAdminPath = regex.test(basePath);

    return (
        <div className="menu-div">
            <Link href={`${basePath}/`}>
                Dashboard
            </Link>
            <Link href={`${basePath}/profile`}>
                Profile
            </Link>
            <Link href={`${basePath}/import`}>
                Import
            </Link>
            {/* <Link href={`${basePath}/export`}>
                Export
            </Link> */}
			{isDevAdminPath &&
                <Link href={`${basePath}/changeUserPassword`}>
                    Change User Password
                </Link>
            }
        </div>
    )
}