"use client";

import { useState } from "react";
import Link from "next/link";
import { signup, UserDataFillType } from "@/actions/signup";
import { useRouter } from "next/navigation";

const UserDataFillDefault: UserDataFillType = {
    category: "student",
    uniqueId: "",
    name: "",
    email: "",
    mobile: 0,
    password: "",
}

export default function Page() {
    const [formData, setFormData] = useState<UserDataFillType>(UserDataFillDefault);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = event.target;
        let inputValue = value;

        if (name === "uniqueId") {
            inputValue = inputValue.slice(0, 11);
        } else if (name === "mobile") {
            inputValue = inputValue.slice(0, 10);
        }

        setFormData({
            ...formData,
            [name]: inputValue
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setIsLoading(true);

        const result = await signup(formData);

        if (result.error) {
            setError(result.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        } else {
            router.push("/");
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="flex justify-center items-center rounded-lg">
                <form 
                    className={`bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 overflow-y-auto form`}
                    onSubmit={handleSubmit}
                >
                    {error === ""?
                        <h1 className="text-2xl text-center">Sign Up</h1>
                        :
                        <h1 className="text-2xl text-center text-red-500">{error}</h1>
                    }
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            id="category"
                            className="flex-grow"
                            value={formData.category}
                            onChange={handleFormDataChange}
                            required
                        >
                            <option value="select" disabled>Select</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="uniqueId">Unique ID</label>
                        <input
                            type="text"
                            name="uniqueId"
                            id="uniqueId"
                            value={formData.uniqueId}
                            onChange={handleFormDataChange}
                            placeholder="Enter your unique id"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleFormDataChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleFormDataChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="mobile">Mobile</label>
                        <input
                            type="number"
                            name="mobile"
                            id="mobile"
                            value={formData.mobile === 0? "" : formData.mobile}
                            onChange={handleFormDataChange}
                            placeholder="Enter your mobile number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleFormDataChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-tertiary-color text-white p-2 rounded-lg font-bold disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading? "Trying..." : "Sign up"}
                    </button>
                    <span className="mt-4 text-center font-bold">
                        Have an account? <Link className="text-tertiary-color" href="/">Login</Link> 
                    </span>
                </form>
            </div>
        </>
    );
};