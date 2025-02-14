"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useBasePathContext } from "@/context/BasePathContext";
import { useEffect } from "react";
import getBasePath from "@/actions/getBasePath";

export default function NavBar() {
    const { status } = useSession();
    const router = useRouter();
    const { basePath, setBasePath } = useBasePathContext();

    useEffect(() => {
        (async () => {
            const path = await getBasePath();

            if (path.error) {
                return ;
            }

            setBasePath(path.result);
        })();
    }, [setBasePath]);

    return (
        <div className="
            flex justify-center sm:justify-start items-center flex-shrink-0 gap-x-5
            w-full h-16 sm:px-5
            bg-tertiary-color
            font-bold text-white text-lg
            [&_>_*]:flex [&_>_*]:justify-center [&_>_*]:items-center
            [&_>_*]:h-full [&_>_*]:px-2.5
            [&_>_*]:uppercase
            [&_>_*]:darken
            "
        >
            <Link href={`${basePath}/`}>Home</Link>
            <Link href={`/about`}>About</Link>
            <Link href={`/contact`}>Contact</Link>
            {status === `authenticated` &&
                <button onClick={() => {
                    signOut({ redirect: false }).then(() => {
                        router.push("/")
                    });
                }}>
                    Log out
                </button>
            }
        </div>
    );
};

// http://192.168.29.47:3000