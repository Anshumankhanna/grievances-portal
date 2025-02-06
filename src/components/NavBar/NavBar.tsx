"use client";

import Link from "next/link";
import styles from "@/components/NavBar/NavBar.module.css"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useBasePathContext } from "@/context/BasePathContext";

export default function NavBar() {
    const { status } = useSession();
    const router = useRouter();

    return (
        <div className={styles.navbar}>
            <Link href="/">Home</Link>
            <Link href={"/about"}>About</Link>
            <Link href={"/contact"}>Contact</Link>
            {status === "authenticated" &&
                <button onClick={() => {
                    signOut({ redirect: false }).then(() => {
                        router.push("/")
                    });
                }}>
                    Log out
                </button>
            }
        </div>
    )
}