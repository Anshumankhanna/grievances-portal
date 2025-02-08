"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import Link from "next/link";

export default function UserMenu() {
    const { basePath } = useBasePathContext();

    return (
        <div className="menu-div">
            <Link href={`${basePath}/`}>
                Dashboard
            </Link>
            <Link href={`${basePath}/profile`}>
                Profile
            </Link>
        </div>
    )
}