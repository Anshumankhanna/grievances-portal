"use client";

import { useState } from "react";
import styles from "./Panel.module.css";
import { ContentValueType } from "@/types/contentTypes";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../Profile/Profile";

export default function Panel() {
    const [content, setContent] = useState<ContentValueType>("dashboard");
    return (
        <div className="h-full flex items-center justify-center rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
            <div className={`${styles["menu-div"]}`}>
                <div onClick={() => {
                    setContent("dashboard");
                }}>
                    Dashboard
                </div>
                <div onClick={() => {
                    setContent("profile");
                }}>
                    Profile
                </div>
            </div>
            <div className="flex-grow text-black p-3">
                {/* put profile and dashboard components here */}
                {content === "dashboard" && <Dashboard />}
                {content === "profile" && <Profile />}
            </div>
        </div>
    )
}