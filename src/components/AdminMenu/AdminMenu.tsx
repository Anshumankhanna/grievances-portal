"use client";

import Link from "next/link";

export default function AdminMenu() {

    return (
        <div className="menu-div">
            <Link href={"/"}>
                Dashboard
            </Link>
            <Link href={"/profile"}>
                Profile
            </Link>
            <Link href={"/import"}>
                Import
            </Link>
            {/* <Link href={"/export"}>
                Export
            </Link> */}
			<Link href={"/changeUserPassword"}>
                Change User Password
            </Link>
        </div>
    )
}