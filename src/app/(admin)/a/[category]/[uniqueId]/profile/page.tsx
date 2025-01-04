"use client";

import { UserDataProfileType } from "@/types/userTypes";
import getUserDetails from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react"

export default function Profile() {
    const [profileData, setProfileData] = useState<UserDataProfileType | null>(null);

    useEffect(() => {
        (async () => {
            const session = await getSession();

            if (session === null) {
                // console.error("Session not found");
                return ;
            }

            const { error, result } = await getUserDetails(session.user.uniqueId, "_id", "name", "email", "mobile", "createdAt");

            if (error !== null || result._id === undefined || result.name === undefined || result.email === undefined || result.mobile === undefined || result.createdAt === undefined) {
                console.error(error ?? "Something went wrong");
                return ;
            }

            setProfileData({
                _id: result._id,
                uniqueId: session.user.uniqueId,
                name: result.name,
                email: result.email,
                mobile: result.mobile,
                createdAt: result.createdAt,
            });
        })()
    }, []);

    return (
        <div
            className="flex flex-col full"
        >
            <h1 className="w-full text-center text-2xl">Profile</h1>
            <div className="w-fit h-fit p-3 grid grid-cols-2">
                {profileData !== null &&
                    <>
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
                    </>
                }
            </div>
        </div>
    )
};