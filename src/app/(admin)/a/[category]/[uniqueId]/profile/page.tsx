// to-do: Add password change feature from here
// Display stats here: Resolved vs unresolved complaints, number of complaints

"use client";

import { AdminType, UserType } from "@/models";
import getMyDetails from "@/utils/getMyDetails";
import { useEffect, useState } from "react"

export default function Profile() {
    const [profileData, setProfileData] = useState<(Pick<UserType | AdminType, "uniqueId" | "name" | "email" | "mobile" | "createdAt"> & { numbeOfComplaints: number }) | null>(null);

    useEffect(() => {
        (async () => {
            const details = await getMyDetails("uniqueId", "name", "email", "mobile", "createdAt", "complaints");
            
            if (details.error) {
                return ;
            }

            setProfileData({
                uniqueId: details.result.uniqueId ?? "",
                name: details.result.name ?? "",
                email: details.result.email ?? "",
                mobile: details.result.mobile ?? 0,
                createdAt: details.result.createdAt ?? new Date(),
                numbeOfComplaints: (details.result.complaints ?? []).length
            });
        })()
    }, []);

    return (
        <div
            className="flex flex-col size-full p-3"
        >
            <h1 className="text-4xl underline text-center">Profile</h1>
            <div className="size-fit pt-6 grid grid-cols-2">
                {profileData !== null &&
                    <>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>ID:</div>
                            <div>{profileData.uniqueId}</div>
                        </div>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>Name:</div>
                            <div>{profileData.name}</div>
                        </div>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>Email:</div>
                            <div>{profileData.email}</div>
                        </div>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>Mobile:</div>
                            <div>{profileData.mobile}</div>
                        </div>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>Created At:</div>
                            <div>{profileData.createdAt.toLocaleString("en-IN")}</div>
                        </div>
                        <div className="bg-gray-300 grid grid-cols-2">
                            <div>Complaints:</div>
                            <div>{profileData.numbeOfComplaints}</div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
};