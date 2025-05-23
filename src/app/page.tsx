//Login page
"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import getBasePath from "@/actions/getBasePath";

type UserDataLoginType = {
    uniqueId: string;
    password: string;
};
const UserDataLoginDefault: UserDataLoginType = {
    uniqueId: "",
    password: "",
};

export default function Page() {
    const [formData, setFormData] = useState<Partial<UserDataLoginType>>(UserDataLoginDefault);
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const router = useRouter();

    const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        setIsLoading(true);

        const path = await getBasePath(formData.uniqueId);
        const result = await signIn("credentials", {
            uniqueId: formData.uniqueId,
            password: formData.password,
            redirect: false,
        });
        
        if (result === undefined || result.error) {
            // console.error(!result? "Sign In failed" : result.error);

            setIsValid(false);
            setTimeout(() => {
                setIsValid(true);
            }, 2000);
        } else if (result.ok) {
            router.push(path.result);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex justify-center items-center rounded-lg">
            <form className={`bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 form`} onSubmit={handleSubmit}>
                <h1 className="text-3xl text-black text-center text-tertiary-color font-bold">Login</h1>
                <div>
                    <label htmlFor="uniqueId" className="text-black">Unique ID</label>
                    <input
                        type="text"
                        name="uniqueId"
                        id="uniqueId"
                        placeholder="Enter your unique ID"
                        value={formData.uniqueId}
                        onChange={handleFormDataChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="text-black">Password</label>
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
                {isValid?
                    <button
                        type="submit"
                        className={`${isLoading? "bg-gray-400" : "bg-tertiary-color"} text-white p-2 rounded-lg font-bold`}
                    >
                        Login
                    </button>
                    :
                    <span className="text-white bg-red-500 p-2 rounded-lg font-bold w-full text-center">Invalid!! Try Again!!</span>
                }
                <div>
                    <span className="mt-4 text-center font-bold">
                        <Link className="text-tertiary-color" href="/forgotPassword">Forgot Password</Link>
                    </span>
                    <span className="mt-4 text-center font-bold">
                        <Link className="text-tertiary-color" href="/signup">Signup</Link>
                    </span>
                </div>
            </form>
        </div>
    );
}