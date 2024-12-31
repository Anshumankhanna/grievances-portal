//Login page
"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useBasePathContext } from "@/context/BasePathContext";
import getBasePath from "@/utils/getBasePath";

export type LoginData = {
    uniqueId: string;
    password: string;
};

export const BlankLoginData = {
    uniqueId: "",
    password: "",
};

export default function LoginPage() {
    const [formData, setFormData] = useState<LoginData>(BlankLoginData);
    const router = useRouter();
    const { setBasePath } = useBasePathContext();

    const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        let inputValue= value;

        if (name === "uniqueId") {
            inputValue = inputValue.slice(0, 11);
        }

        setFormData({
            ...formData,
            [name]: inputValue
        })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        
        const result = await signIn("credentials", {
            uniqueId: formData.uniqueId,
            password: formData.password,
            redirect: false,
        });
        
        if (result === undefined) {
            console.log("Sign In failed");
        } else if (result.error) {
            console.error(result.error);
        } else if (result.ok) {
            const { error, result } = await getBasePath(formData.uniqueId);

            if (error !== null) {
                console.error(error);
            } else {
                setBasePath(result);
                router.push(result);
            }
        }
    };
    return (
        <div className="flex justify-center items-center rounded-lg">
            <form className={`bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 ${styles.form}`} onSubmit={handleSubmit}>
                <h1 className="text-3xl text-black text-center text-tertiary-color font-bold">Login</h1>
                <div>
                    <label className="text-black">Unique ID</label>
                    <input
                        type="number"
                        name="uniqueId"
                        id="uniqueId"
                        placeholder="Enter your unique ID"
                        value={formData.uniqueId}
                        onChange={handleFormDataChange}
                        required
                    />
                </div>
                <div>
                    <label className="text-black">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleFormDataChange}
                        required
                    />
                </div>
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