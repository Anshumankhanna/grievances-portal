"use client";

import { useRouter } from "next/navigation";

export default function UserMenu() {
    const router = useRouter();

    return (
        <div className="menu-div">
            <div
                onClick={() => {
                    router.push("/");
                }}
            >
                Dashboard
            </div>
            <div
                onClick={() => {
                    router.push("/profile")
                }}
            >
                Profile
            </div>
        </div>
    )
}