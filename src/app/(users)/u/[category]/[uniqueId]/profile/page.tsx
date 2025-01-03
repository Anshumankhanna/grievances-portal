"use client";

import { UserDataProfileDefault, UserDataProfileType } from "@/types/userTypes";
import getUserDetails from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react"

export default function Profile() {
    const [profileData, setProfileData] = useState<UserDataProfileType>(UserDataProfileDefault);

    useEffect(() => {
        (async () => {
            const session = await getSession();

            if (session === null) {
                // console.error("Session not found");
                return ;
            }

            const { error, result } = await getUserDetails(session.user.uniqueId, "name", "email", "mobile", "createdAt");

            if (error !== null) {
                // console.error(error)
                return ;
            }

            setProfileData({
                uniqueId: session.user.uniqueId,
                name: result.name ?? UserDataProfileDefault.name,
                email: result.email ?? UserDataProfileDefault.email,
                mobile: result.mobile ?? UserDataProfileDefault.mobile,
                createdAt: result.createdAt ?? UserDataProfileDefault.createdAt,
            });
        })()
    }, []);

    return (
        <div
            className="flex flex-col full"
        >
            <h1 className="w-full text-center text-2xl">Profile</h1>
            <div className="w-fit h-fit p-3 grid grid-cols-2">
                <div>ID:</div>
                <div>{profileData.uniqueId}</div>
                <div>Name:</div>
                <div>{profileData.name}</div>
                <div>email</div>
                <div>{profileData.email}</div>
                <div>Mobile:</div>
                <div>{profileData.mobile}</div>
                <div>Created at:</div>
                <div>{profileData.createdAt.toLocaleString("en-IN")}</div>
            </div>
        </div>
    )
};