"use client";

import { useBasePathContext } from "@/context/BasePathContext";
import { useRouter } from "next/navigation";

export default function UserMenu() {
    const router = useRouter();
    const { basePath } = useBasePathContext();

    return (
        <div className="menu-div">
            <div
                onClick={() => {
                    router.push(`${basePath}`);
                }}
            >
                Dashboard
            </div>
            <div
                onClick={() => {
                    router.push(`${basePath}/profile`)
                }}
            >
                Profile
            </div>
        </div>
    )
}