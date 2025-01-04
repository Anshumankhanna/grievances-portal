"use client";

import getUserDetails from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ComplaintDataAdminExtractType, StatusColor } from "@/types/complaintTypes";
import { UserDataAdminDashboardType } from "@/types/userTypes";
import getComplaints from "@/utils/getComplaints";
import formatDate from "@/utils/formatDate";
import capitalize from "@/utils/capitalize";

export default function Page() {
    const [userData, setUserData] = useState<UserDataAdminDashboardType | null>(null);
    const [complaintData, setComplaintData] = useState<ComplaintDataAdminExtractType[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const session = await getSession();

            if (session === null) {
                return ;
            }
            
            {
                const { error, result } = await getUserDetails(session.user.uniqueId, "_id", "name", "uniqueId");

                if (error !== null || result._id === undefined || result.uniqueId === undefined || result.name === undefined) {
                    console.error(error);
                    return ;
                }
                
                setUserData({
                    _id: result._id,
                    name: result.name,
                    uniqueId: result.uniqueId
                })
            }

            {
                const { error, result } = await getComplaints();

                if (error !== null) {
                    console.error(error);
                    return ;
                }

                setComplaintData(result);
                console.log(result);
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
                        <span className="font-bold">Name:</span> {userData?.name ?? "Name"}
                    </div>
                    <div>
                        <span className="font-bold">ID:</span> <span className="text-blue-400">{userData?.uniqueId ?? "00000000000"}</span>
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
                    {complaintData.length > 0 &&
                        complaintData.map((elem, row) => (
                            <div key={row}>
                                {
                                    <>
                                        <div>{row + 1}</div>
                                        <div>{elem.user.name}</div>
                                        <div>{elem.subject}</div>
                                        <div>{elem.description}</div>
                                        <div
                                            style={{
                                                color: StatusColor[elem.status],
                                            }}
                                        >{capitalize(elem.status)}</div>
                                        <div>{formatDate(elem.createdAt)}</div>
                                    </>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};