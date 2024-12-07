//Login page

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; //for navigation
import styles from "./page.module.css";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import Link from "next/link";

export default function LoginPage() {
    const [enrollNo, setEnrollNo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role (Dropdown can update this)
    const router = useRouter();
    //Declaring repetitive variables

    //HANDLING FORM SUBMISSION
    const handleSub = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission

        if (role.toLowerCase() === "admin") {
            router.push("/a");
        }
        
        router.push(`/u/${role.toLowerCase()[0]}/${enrollNo}`);
    };
    return (
        <div className="flex justify-center items-center rounded-lg">
            <form className="bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3" onSubmit={handleSub}>
                <h1 className="text-3xl text-black text-center text-tertiary-color font-bold">Login</h1>
                <DropdownMenu
                    onRoleSelect={(role) => setRole(role.toLowerCase())}
                />
                {/* regardless if its for signup or login we ask email and password */}
                <div>
                    <label className="text-black">Enroll. No.</label>
                    <input
                        type="text"
                        className={`${styles.base}`}
                        placeholder="Enter enrollment number"
                        value={enrollNo}
                        onChange={(event) => setEnrollNo(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="text-black">Password</label>
                    <input
                        type="password"
                        className={`${styles.base}`}
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                {/* submision button */}
                <button
                    type="submit"
                    className="bg-tertiary-color text-white p-2 rounded-lg font-bold"
                >
                    Login
                </button>
                <span className="mt-4 text-center font-bold">
                    Don&apos;t have account? <Link className="text-tertiary-color" href="/signup">Signup</Link> 
                </span>
            </form>
        </div>
    );
}