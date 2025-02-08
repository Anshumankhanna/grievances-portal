"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";

export default function AdminMenu() {
    const { basePath } = useBasePathContext();

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
			<Link href={`${basePath}/changeUserPassword`}>
                Change User Password
            </Link>
        </div>
    )
}