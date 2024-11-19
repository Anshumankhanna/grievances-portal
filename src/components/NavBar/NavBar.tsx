import Link from "next/link";
import styles from "@/components/NavBar/NavBar.module.css"

export default function NavBar() {
    return (
        <div className={`${styles.navbar}`}>
            <Link href={"/"}>Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact</Link>
            <Link href={"/signup"}>Sign Up</Link>
        </div>
    )
}