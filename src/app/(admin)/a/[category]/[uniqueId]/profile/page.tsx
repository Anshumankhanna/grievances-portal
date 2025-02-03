"use client";

import { AdminType, UserType } from "@/models";
import getMyDetails from "@/utils/getMyDetails";
import { useEffect, useState } from "react"

export default function Profile() {
    const [profileData, setProfileData] = useState<Pick<UserType | AdminType, "uniqueId" | "name" | "email" | "mobile" | "createdAt"> | null>(null);

    useEffect(() => {
        (async () => {
            const details = await getMyDetails("uniqueId", "name", "email", "mobile", "createdAt");
            
            if (details.error) {
                return ;
            }

            setProfileData({
                uniqueId: details.result.uniqueId ?? "",
                name: details.result.name ?? "",
                email: details.result.email ?? "",
                mobile: details.result.mobile ?? 0,
                createdAt: details.result.createdAt ?? new Date(),
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