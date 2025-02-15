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
import { useAdminSideComplaintsContext } from "./AdminSideComplaintsContext";
import orderComplaints from "@/utils/orderComplaints";
import Image from "next/image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { StatusType } from "@/models";

type FilterType = "status" | "uniqueId" | "name" | "email" | "mobile" | "selected";

function BlankComponent({ message }: { message: string }) {
    return (
        <div className="bg-slate-200 flex-grow rounded-lg mb-3 p-3 text-3xl text-center text-gray-500">
            {message}
        </div>
    );
};

export default function AdminPage() {
    const { complaints, setComplaints } = useAdminSideComplaintsContext();
    const newBasePath = usePathname();
    const [userData, setUserData] = useState<{
        uniqueId: string;
        name: string;
    }>({
        uniqueId: "",
        name: ""
    });
    const [loadingComplaints, setLoadingComplaints] = useState(true);
    
    const [displayComplaintData, setDisplayComplaintData] = useState<ComplaintDataAdminType[]>([]);
    const [statusUpdated, setStatusUpdated] = useState(false);
    const [filter, setFilter] = useState<FilterType>("selected");
    const [filterValue, setFilterValue] = useState<string>("");
    const [arrowOrientation, setArrowOrientation] = useState(true);
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

            orderComplaints(complaints.result, "desc");
            setComplaints(complaints.result);
            setDisplayComplaintData(complaints.result);
            setLoadingComplaints(false);
        })()
    }, [statusUpdated, setComplaints]);

    const filterData = () => {
        if (filter === "selected") {
            return ;
        }
        if (filter === "status") {
            setDisplayComplaintData(complaints.filter((elem) => elem.status.toLowerCase() === filterValue.toLowerCase()));
            return ;
        }

        setDisplayComplaintData(complaints.filter((elem) => elem.user[filter].toString().toLowerCase() === filterValue.toLowerCase()));
    };
    const generatePDF = () => {
        const pdf = new jsPDF();
    
        // Add Title
        pdf.setFontSize(18);
        pdf.text("Complaint Report", 14, 20);
    
        // Table Headers
        const tableHeaders = [
            ["S.No", "User", "Subject", "Description", "Status", "Created"]
        ];
    
        // Table Data with Wrapped Description
        const tableData = displayComplaintData.map((complaint, index) => [
            index + 1,
            [capitalize(complaint.user.category), complaint.user.uniqueId, complaint.user.name, complaint.user.email, complaint.user.mobile].join("\n"),
            complaint.subject,
            pdf.splitTextToSize(complaint.description, 70), // Wrap description properly
            capitalize(complaint.status),
            complaint.createdAt.toLocaleString("en-IN"),
        ]);
    
        // Generate Table
        autoTable(pdf, {
            head: tableHeaders,
            body: tableData,
            startY: 30, // Start after the title
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" }, // Blue header
            alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray alternate rows
            columnStyles: {
                2: { cellWidth: 20 }, // Increase Description column width
                3: { cellWidth: 70 }, // Increase Description column width
            },
            didParseCell: function (data) {
                if (data.column.index === 4) { // "Status" Column
                    const status = data.cell.text[0].toLowerCase() as StatusType;

                    if (status === "resolved") {
                        data.cell.styles.textColor = [0, 128, 0]; // Green for resolved
                    } else if (status === "unresolved") {
                        data.cell.styles.textColor = [255, 0, 0]; // Red for unresolved
                    }
                }
            }
        });
    
        // Save PDF
        pdf.save("complaints_report.pdf");
    };      

    return (
        <div
            className="flex items-start flex-grow flex-col
                text-black
            "
        >
            {/* this is the nav-strip */}
            <div className="min-h-24 w-full flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row sm:gap-x-3 justify-between items-center px-3 sm:px-10 py-5">
                <div className="flex flex-col justify-between h-full text-xl">
                    <div>
                        <span className="font-bold">Name:</span> {userData.name}
                    </div>
                    <div>
                        <span className="font-bold">ID:</span> <span className="text-blue-400">{userData.uniqueId}</span>
                    </div>
                </div>
                <div className="rounded-lg min-h-11 grid grid-cols-3 sm:grid-cols-[1fr_2fr_1fr] gap-y-2 border border-gray-400 overflow-clip">
                    <select className="border-0" value={filter} name="filter" id="filter" onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setFilter(event.target.value as FilterType)}>
                        <option value="selected" disabled={filter !== "selected"}>Selected</option>
                        <option value="status">Status</option>
                        <option value="category">Category</option>
                        <option value="uniqueId">ID</option>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="mobile">Mobile</option>
                    </select>
                    <input
                        className="border-0 border-l border-black rounded-none"
                        type="text"
                        name="filterinput"
                        id="filterinput"
                        value={filterValue}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.value === "") {
                                setDisplayComplaintData(complaints);
                            }

                            setFilterValue(event.target.value);
                        }}
                    />
                    <button className="text-white border-0 bg-tertiary-color px-3 font-bold hover:underline" type="button" onClick={filterData}>Filter</button>
                </div>
                <button type="button" className="text-white bg-tertiary-color px-6 py-2 rounded-lg font-bold hover:underline" onClick={generatePDF}>Export Data</button>
            </div>
            <div className="flex-grow h-72 w-full max-w-full overflow-auto p-3">
                {displayComplaintData.length === 0?
                    <BlankComponent message={loadingComplaints? "Loading..." : "No complaints yet"} />
                    :
                    <div className={styles["table-grid"]}>
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
                            <div className="flex justify-around">
                                Created
                                <Image src="/images/angle-up-solid.svg" width={12} height={12}  alt="Arrow" className={`cursor-pointer ${arrowOrientation? "rotate-0" : "rotate-180"}`} onClick={() => {
                                    setArrowOrientation(!arrowOrientation);
                                    orderComplaints(complaints, arrowOrientation? "asc" : "desc");
                                }} />
                            </div>
                        </div>
                        {displayComplaintData.map((complaint, index) => (
                            <div key={index}>
                                <div>{index + 1}</div>
                                <div className="grid grid-cols-2 p-0 size-full items-center [&_>_div]:border-b [&_>_div]:border-black [&_>_div]:size-full [&_>_div:nth-last-child(-n+2)]:border-b-0">
                                    <div>Category:</div>
                                    <div>{capitalize(complaint.user.category)}</div>
                                    <div>ID:</div>
                                    <div>{complaint.user.uniqueId}</div>
                                    <div>Name:</div>
                                    <div>{complaint.user.name}</div>
                                    {/* Email should be a link */}
                                    <div>Email:</div>
                                    <div className="text-blue-500 underline"><a href={`mailto:${complaint.user.email}`}>{complaint.user.email}</a></div>
                                    <div>Mobile:</div>
                                    <div>{complaint.user.mobile}</div>
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
                }
            </div>
        </div>
    )
};