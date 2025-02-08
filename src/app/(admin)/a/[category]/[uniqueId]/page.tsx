"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import getComplaints, { ComplaintDataAdminType } from "@/utils/getComplaints";
import capitalize from "@/utils/capitalize";
import getMyDetails from "@/utils/getMyDetails";
import statusColor from "@/utils/statusColor";
import changeComplaintStatus from "@/actions/changeComplaintStatus";
import { usePathname } from "next/navigation";
import { useBasePathContext } from "@/context/BasePathContext";

type FilterType = "status" | "uniqueId" | "name" | "email" | "mobile" | "selected";

export default function Page() {
    const newBasePath = usePathname();
    const [userData, setUserData] = useState<{
        uniqueId: string;
        name: string;
    }>({
        uniqueId: "",
        name: ""
    });
    const [complaintData, setComplaintData] = useState<ComplaintDataAdminType[]>([]);
    const [displayComplaintData, setDisplayComplaintData] = useState<ComplaintDataAdminType[]>([]);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [filter, setFilter] = useState<FilterType>("selected");
    const [filterValue, setFilterValue] = useState<string>("");
    const { setBasePath } = useBasePathContext();

    useEffect(() => {
        setBasePath(newBasePath);
    }, [setBasePath, newBasePath]);
    useEffect(() => {
        (async () => {
            const details = await getMyDetails("uniqueId", "name");

            if (details.error || !details.result.uniqueId || !details.result.name) {
                console.error(details.error);
                return ;
            }
            
            setUserData({
                uniqueId: details.result.uniqueId,
                name: details.result.name
            });

            const complaints = await getComplaints();

            if (complaints.error) {
                console.error(complaints.error);
                return ;
            }

            setComplaintData(complaints.result);
            setDisplayComplaintData(complaints.result);
        })()
    }, [statusUpdated]);

    const filterData = () => {
        if (filter === "selected") {
            return ;
        }
        if (filter === "status") {
            setDisplayComplaintData(complaintData.filter((elem) => elem.status === filterValue));
            return ;
        }

        setDisplayComplaintData(complaintData.filter((elem) => elem.user[filter] === filterValue));
    };

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
                <div className="rounded-lg grid grid-cols-[1fr_2fr_1fr] gap-x-3">
                    <select value={filter} name="filter" id="filter" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value as FilterType)}>
                        <option value="selected" disabled={filter !== "selected"}>Selected</option>
                        <option value="status">Status</option>
                        <option value="uniqueId">ID</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="mobile">Mobile</option>
                    </select>
                    <input
                        type="text"
                        value={filterValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.value === "") {
                                setDisplayComplaintData(complaintData);
                            }

                            setFilterValue(event.target.value);
                        }}
                    />
                    <button className="text-white bg-tertiary-color p-2 rounded-lg font-bold hover:underline" type="button" onClick={filterData}>Filter</button>
                </div>
            </div>
            <div className="flex-grow h-72 overflow-y-auto p-3">
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
                    {displayComplaintData.map((complaint, index) => (
                        <div key={index}>
                            <div>{index + 1}</div>
                            <div className="grid grid-cols-2 gap-y-2 size-full items-center [&_>_*]:border-b-2 [&_>_*]:border-black [&_>_*]:size-full">
                                <div>ID:</div>
                                <div>{complaint.user.uniqueId}</div>
                                <div>Name:</div>
                                <div>{complaint.user.name}</div>
                                {/* Email should be a link */}
                                <div>Email:</div>
                                <div className="text-blue-500 underline"><a href={`mailto:${complaint.user.email}`}>{complaint.user.email}</a></div>
                                <div>Mobile:</div>
                                <div>{complaint.user.mobile}</div>
                                <div>Created:</div>
                                <div>{complaint.user.createdAt.toLocaleString("en-IN")}</div>
                            </div>
                            <div>{complaint.subject}</div>
                            <div>{complaint.description}</div>
                            <div
                                className="font-bold break-normal cursor-pointer" style={{
                                    color: statusColor(complaint.status)
                                }}
                                onClick={async () => {
                                    await changeComplaintStatus(complaint.createdAt, complaint.status === "resolved"? "unresolved" : "resolved");
                                    setStatusUpdated(!statusUpdated);
                                }}
                            >
                                {capitalize(complaint.status)}
                            </div>
                            <div>{complaint.createdAt.toLocaleString("en-IN")}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};