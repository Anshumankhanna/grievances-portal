//Login page

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; //for navigation
import styles from "./page.module.css";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
export default function LoginPage() {
    const [isLogin, setisLogin] = useState(true);
    const [enrollNo, setEnrollNo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role (Dropdown can update this)
    const router = useRouter();
    //Declaring repetitive variab;es
    const action = isLogin ? "LOGIN" : "SIGN UP"; //change h1 tag
    const toggleText = isLogin
        ? "Don't have account? "
        : "Already existing acc? "; //dynamic display prompt
    const toggleLink = isLogin ? "Sign Up" : "Login";

    //HANDLING FORM SUBMISSION
    const handleSub = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent default form submission
        if (role.toLowerCase() === "admin") {
            router.push("/admin");
        } else if (
            ["student", "teacher", "parent"].includes(role.toLowerCase())
        ) {
            router.push(`/user/${role.toLowerCase()}`);
        } else {
            alert("Invalid role selected. Please try again.");
        }
    };
    return (
        <div className="flex items-center rounded-lg min-h-screen ">
            <div className="bg-white py-3 px-4 w-96  mx-auto border rounded-lg">
                <h1 className="text-3xl text-black text-center">{action}</h1>
                <DropdownMenu
                    onRoleSelect={(role) => setRole(role.toLowerCase())}
                />

                <form className="space-y-5" onSubmit={handleSub}>
                    {!isLogin && (
                        //only render input for Name  if isLogin is false
                        <div>
                            <label className="text-black">Name</label>
                            <input
                                type="text"
                                className={`${styles.base}`}
                                placeholder="Enter name"
                                required
                            />
                        </div>
                    )}
                    {/* regardless if its for signup or login we ask email and password */}
                    <div>
                        <label className="text-black">Enroll. No.</label>
                        <input
                            type="text"
                            className={`${styles.base}`}
                            placeholder="Enter enrollment number"
                            value={enrollNo}
                            onChange={(e) => setEnrollNo(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* submision button */}
                    <button
                        type="submit"
                        className="w-full mx-auto bg-emerald-800 text-white p-2 rounded-lg"
                    >
                        {action}
                    </button>
                </form>
                <p className="mt-4 text-center font-bold text-black">
                    {toggleText}{" "}
                    <span
                        onClick={() => setisLogin(!isLogin)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                        {toggleLink}
                    </span>
                </p>
            </div>
        </div>
    );
}
