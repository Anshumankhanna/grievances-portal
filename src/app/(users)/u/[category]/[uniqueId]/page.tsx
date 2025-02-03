"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import addComplaint, { ComplaintDataFillType } from "@/actions/addComplaint";
import getMyDetails from "@/utils/getMyDetails";
import { ComplaintType } from "@/models";
import getUserComplaints, { ComplaintDataUserType } from "@/actions/getUserComplaints";
import statusColor from "@/utils/statusColor";
import capitalize from "@/utils/capitalize";

const ComplaintDataFillDefault: ComplaintDataFillType = {
	subject: "",
	description: "",
};

export default function Page() {
    const [userData, setUserData] = useState<{
        uniqueId: string;
        name: string;
    }>({
        uniqueId: "",
        name: ""
    });
    const [complaints, setComplaints] = useState<ComplaintDataUserType[]>([]);
    const [formData, setFormData] = useState<ComplaintDataFillType>(ComplaintDataFillDefault);
    const [dialogState, setDialogState] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            const details = await getMyDetails("uniqueId", "name");

            if (details.error || !details.result.uniqueId || !details.result.name) {
                return ;
            }

            setUserData({
                uniqueId: details.result.uniqueId,
                name: details.result.name
            });

            const complaintData = await getUserComplaints(details.result.uniqueId);

            if (complaintData.error) {
                return ;
            }

            setComplaints(complaintData.result);
        })()
    }, [dialogState]);

    const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormData({
            subject: formData.subject.trim(),
            description: formData.description.trim(),
        });
        
        const { error, result } = await addComplaint(formData); //eslint-disable-line

        if (error !== null) {
            console.error(error);
        } else {
            setDialogState(false);
			setFormData(ComplaintDataFillDefault);
        }
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
                        <span className="font-bold">Name:</span> {userData?.name ?? "Name"}
                    </div>
                    <div>
                        <span className="font-bold">ID:</span> <span className="text-blue-400">{userData?.uniqueId ?? "00000000000"}</span>
                    </div>
                </div>
                <button
                    className="
                        bg-tertiary-color
                        rounded-md
                        px-6 py-3
                        h-fit
                        font-semibold text-white
                        hover:underline hover:bg-cyan-700
                    "
                    onClick={() => {
                        setDialogState(!dialogState);
                    }}
                >
                    New complaint
                </button>
                <dialog open={dialogState} className="absolute-center w-[50%] h-[80%]">
                    <form
                        className="p-3 flex flex-col gap-2 full"
                        onSubmit={handleSubmit}
                    >
                        <div className={`${styles["form-field"]}`}>
                            <label htmlFor="subject">Subject:</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                maxLength={30}
                                value={formData.subject}
                                onChange={handleFormDataChange}
                            />
                        </div>
                        <div className={`${styles["form-field"]} flex-grow`}>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                className="full text-black"
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleFormDataChange}
                            />
                        </div>
                        <div className={`${styles["button-layer"]}`}>
                            <button type="submit">
                                Submit
                            </button>
                            <button
								type="button"
                                onClick={() => setDialogState(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
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
                    {complaints.map((complaint, index) => (
                        <div key={index}>
                            <div>{index + 1}</div>
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