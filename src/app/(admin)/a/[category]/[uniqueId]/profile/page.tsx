// to-do: Add password change feature from here
// Display stats here: Resolved vs unresolved complaints, number of complaints

"use client";

import getUserComplaints, { ComplaintDataUserType } from "@/actions/getUserComplaints";
import { AdminType, UserType } from "@/models";
import getMyDetails from "@/utils/getMyDetails";
import { useEffect, useState } from "react"

export default function Profile() {
    const [profileData, setProfileData] = useState<Pick<UserType | AdminType, "uniqueId" | "name" | "email" | "mobile" | "createdAt"> | null>(null);
    const [resolved, setResolved] = useState(0);
    const [unresolved, setUnresolved] = useState(0);

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
                createdAt: details.result.createdAt ?? new Date()
            });

            const complaints = await getUserComplaints(details.result.uniqueId ?? "");

            if (complaints.error) {
                return ;
            }

            const counts = complaints.result.reduce(
                (accum: [number, number], complaint: ComplaintDataUserType): [number, number] => {
                    if (complaint.status === "resolved") {
                        ++accum[0];
                    } else {
                        ++accum[1];
                    }
    
                    return accum;
                },
                [0, 0]
            );

            setResolved(counts[0]);
            setUnresolved(counts[1]);
        })()
    }, []);

    return (
        <div
            className="flex flex-col size-full p-5 justify-between"
        >
            <h1 className="text-4xl underline text-center font-mono font-bold text-primary-color">Profile</h1>
            <div className="size-fit flex gap-2">
                {Array.from({ length: unresolved }, (_, index) => (
                    <div className="bg-red-500 size-11 rounded-full" key={index}></div>
                ))}
                {Array.from({ length: resolved }, (_, index) => (
                    <div className="bg-green-500 size-11 rounded-full" key={index}></div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-3 [&_>_*]:bg-gray-300 [&_>_*]:grid [&_>_*]:grid-cols-2 [&_>_*]:items-center [&_>_*]:rounded-lg [&_>_*]:p-2">
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
                            <div>{resolved + unresolved}</div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
};