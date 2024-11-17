//Login page

"use client";
import { useState } from "react";

export default function LoginPage() {
    const [isLogin, setisLogin] = useState(true);

    //Declaring repetitive variab;es
    const action = isLogin ? "Login" : "Sign Up"; //change h1 tag
    const toggleText = isLogin
        ? "Don't have account? "
        : "Already existing acc? "; //dynamic display prompt
    const toggleLink = isLogin ? "Sign Up" : "Login";

    return (
        <div className="flex items-center rounded-lg min-h-screen bg-slate-200">
            <div className="bg-white p-8 w-1/2  mx-auto border rounded-lg">
                <h1 className="text-3xl text-black font-bold text-center">
                    {action}
                </h1>

                <form className="space-y-5 ">
                    {!isLogin && ( //only render input for Name  if isLogin is false
                        <div>
                            <label className="text-gray-900">Name</label>
                            <input
                                type="text"
                                className="input-base"
                                placeholder="Enter name"
                            />
                        </div>
                    )}
                    {/* regardless if its for signup or login we ask email and password */}
                    <div>
                        <label className="text-gray-900">Enroll. No.</label>
                        <input
                            type="text"
                            className="input-base"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="text-gray-900">Password</label>
                        <input
                            type="password"
                            className="input-base"
                            placeholder="Enter password"
                        />
                    </div>
                    {/* submision button */}
                    <button
                        type="submit"
                        className="w-full bg-emerald-800 text-white p-3"
                    >
                        {action}
                    </button>
                </form>
                <p className="mt-4 text-center text-black">
                    {toggleText}{" "}
                    <span
                        onClick={() => setisLogin(!isLogin)}
                        className="text-slate-400 hover:text-black hover:underline cursor-pointer"
                    >
                        {toggleLink}
                    </span>
                </p>
            </div>
        </div>
    );
}
