"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { StatusColor } from "@/types/complaintTypes";
import getComplaints, { ComplaintDataAdminType } from "@/utils/getComplaints";
import formatDate from "@/utils/formatDate";
import capitalize from "@/utils/capitalize";
import getMyDetails from "@/utils/getMyDetails";
import statusColor from "@/utils/statusColor";

export default function Page() {
    const [userData, setUserData] = useState<{
        uniqueId: string;
        name: string;
    }>({
        uniqueId: "",
        name: ""
    });
    const [complaintData, setComplaintData] = useState<ComplaintDataAdminType[]>([]);

    useEffect(() => {
        (async () => {
            {
                const { error, result } = await getMyDetails("uniqueId", "name");

                if (error || !result.uniqueId || !result.name) {
                    console.error(error);
                    return ;
                }
                
                setUserData({
                    uniqueId: result.uniqueId,
                    name: result.name
                })
            }

            {
                const { error, result } = await getComplaints();

                if (error !== null) {
                    console.error(error);
                    return ;
                }

                setComplaintData(result);
            }
        })()
    }, []);

    return (
        <div
            className="flex flex-grow flex-col
                text-black
            "
        >
            {/* this is the nav-strip */}
            <div className="h-24 flex justify-between items-center px-10 py-5">
                <div className="flex flex-col justify-between h-full text-xl">
                    <div>
                        <span className="font-bold">Name:</span> {userData.name}
                    </div>
                    <div>
                        <span className="font-bold">ID:</span> <span className="text-blue-400">{userData.uniqueId}</span>
                    </div>
                </div>
            </div>
            {/* this is where the content is displayed */}
            <div className="flex-grow h-72 overflow-y-auto p-3">
                {/* add all data here in a well displayed manner */}
                {/* {userData.complaints.length > 0 &&
                    userData.complaints.map(elem => ( //eslint-disable-line
                        <div key={1}>{elem.subject}</div>
                    ))
                } */}

                <div
                    className={`${styles["table-grid"]}`}
                >
                    <div>
                        <div>
                            S.no.
                        </div>
                        <div>
                            User
                        </div>
                        <div>
                            Subject
                        </div>
                        <div>
                            Description
                        </div>
                        <div>
                            Status
                        </div>
                        <div>
                            Created
                        </div>
                    </div>
                    {complaintData.map((complaint, index) => (
                        <div key={index}>
                            <div>{index + 1}</div>
                            <div className="flex flex-col justify-center items-center">
                                <div>{complaint.user.uniqueId}</div>
                                <div>{complaint.user.name}</div>
                                {/* Email should be a link */}
                                <div>{complaint.user.email}</div>
                                <div>{complaint.user.mobile}</div>
                                <div>{complaint.user.createdAt.toLocaleString("en-IN")}</div>
                            </div>
                            <div>{complaint.subject}</div>
                            <div>{complaint.description}</div>
                            <div style={{
                                color: statusColor(complaint.status)
                            }}>{capitalize(complaint.status)}</div>
                            <div>{complaint.createdAt.toLocaleString("en-IN")}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};