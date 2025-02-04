import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function AdminMenu() {
    const session = await getServerSession(authOptions);

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
			{session && session.user.category === "devadmin" &&
                <Link href={"/changeUserPassword"}>
                    Change User Password
                </Link>
            }
        </div>
    )
}