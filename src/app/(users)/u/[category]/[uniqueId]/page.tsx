"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import addComplaint, { ComplaintDataFillType } from "@/actions/addComplaint";
import getMyDetails from "@/utils/getMyDetails";
import getUserComplaints from "@/actions/getUserComplaints";
import statusColor from "@/utils/statusColor";
import capitalize from "@/utils/capitalize";
import { useBasePathContext } from "@/context/BasePathContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import orderComplaints from "@/utils/orderComplaints";
import { useUserSideComplaintsContext } from "./UserSideComplaintsContext";

const ComplaintDataFillDefault: ComplaintDataFillType = {
    subject: "",
    description: "",
};

function ComplaintsComponent() {
    const { complaints } = useUserSideComplaintsContext();
    const [arrowOrientation, setArrowOrientation] = useState(true);    // "true" means upright, "false" means down.

    return (
        <div className="flex-grow h-72 overflow-auto p-3">
            <div className={styles["table-grid"]}>
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
                    <div className="flex justify-around">
                        Created
                        <Image src="/images/angle-up-solid.svg" width={12} height={12} alt="Arrow" className={`cursor-pointer ${arrowOrientation? "rotate-0" : "rotate-180"}`} onClick={() => {
                            setArrowOrientation(!arrowOrientation);
                            orderComplaints(complaints, arrowOrientation? "asc" : "desc");
                        }} />
                    </div>
                </div>
                {complaints.map((complaint, index) => (
                    <div key={index}>
                        <div>{index + 1}</div>
                        <div>{complaint.subject}</div>
                        <div>{complaint.description}</div>
                        <div
                            className="font-bold"
                            style={{
                                color: statusColor(complaint.status)
                            }}
                        >
                            {capitalize(complaint.status)}
                        </div>
                        <div>{complaint.createdAt.toLocaleString("en-IN")}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
function BlankComponent({ message }: { message: string }) {
    return (
        <div className="bg-slate-200 flex-grow rounded-lg mb-3 p-3 text-3xl text-center text-gray-500">
            {message}
        </div>
    );
};

export default function UserPage() {
    const { complaints, setComplaints } = useUserSideComplaintsContext();
    const newBasePath = usePathname();
    const [userData, setUserData] = useState<{
        uniqueId: string;
        name: string;
    }>({
        uniqueId: "",
        name: ""
    });
    const [loadingComplaints, setLoadingComplaints] = useState(true);
    const [formData, setFormData] = useState<ComplaintDataFillType>(ComplaintDataFillDefault);
    const [dialogState, setDialogState] = useState(false);
    const { setBasePath } = useBasePathContext();

    useEffect(() => {
        setBasePath(newBasePath);
    }, [newBasePath, setBasePath]);
    useEffect(() => {
        (async (): Promise<void> => {
            const details = await getMyDetails("uniqueId", "name");

            if (details.error || !details.result.uniqueId || !details.result.name) {
                return;
            }

            setUserData({
                uniqueId: details.result.uniqueId,
                name: details.result.name
            });

            const complaintData = await getUserComplaints(details.result.uniqueId);

            if (complaintData.error) {
                return;
            }
            
            orderComplaints(complaintData.result, "desc");
            setComplaints(complaintData.result);
            setLoadingComplaints(false);
        })();
    }, [dialogState, setComplaints]);

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
                [&_>_div]:px-4
                [&_>_div]:sm:px-10
            "
        >
            {/* this is the nav-strip */}
            <div className="h-24 flex justify-between items-center py-5">
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
            {complaints.length === 0 ? <BlankComponent message={loadingComplaints? "Loading..." : "No complaints yet"} /> : <ComplaintsComponent />}
        </div>
    );
};