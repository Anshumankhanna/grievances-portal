import Link from "next/link";

export default function UserMenu() {
    return (
        <div className="menu-div">
            <Link href={"/"}>
                Dashboard
            </Link>
            <Link href={"/profile"}>
                Profile
            </Link>
        </div>
    )
}