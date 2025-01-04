"use client";

import getUserDetails from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ComplaintDataFillType, ComplaintDataUserExtractType, StatusColor, StatusKeyType } from "@/types/complaintTypes";
import addComplaint from "@/actions/addComplaint";
import formatDate from "@/utils/formatDate"; //eslint-disable-line
import capitalize from "@/utils/capitalize";
import { UserDataDashboardType } from "@/types/userTypes";

export default function Page() {
    const [userData, setUserData] = useState<UserDataDashboardType | null>(null);
    const [formData, setFormData] = useState<ComplaintDataFillType>({
        subject: "",
        description: "",
    });
    const [dialogState, setDialogState] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            const session = await getSession();

            if (session === null) {
                return ;
            }
            
            const { error, result } = await getUserDetails(session.user.uniqueId, "_id", "uniqueId", "name", "complaints");

            if (error !== null || result._id === undefined || result.uniqueId === undefined || result.name === undefined || result.complaints === undefined) {
                console.error(error ?? "Something went wrong");
                return ;
            }

            setUserData({
                _id: result._id,
                uniqueId: result.uniqueId,
                name: result.name,
                complaints: result.complaints,
            })
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
                                onClick={() => setDialogState(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </dialog>
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
                    {userData !== null && userData.complaints.length > 0 &&
                        userData.complaints.map((
                            elem: ComplaintDataUserExtractType,
                            row: number
                        ) => 
                            <div key={row}>
                                {/* write here how to display data */}
                                {Object.entries(elem).map((value, col) => (
                                    <div
                                        key={col}
                                        style={{
                                            color: value[0] as keyof ComplaintDataUserExtractType === "status"?
                                                StatusColor[value[1] as StatusKeyType] : "#000",
                                        }}
                                    >
                                        {
                                            value[0] as keyof ComplaintDataUserExtractType === "_id"?
                                                row + 1 :
                                                value[0] as keyof ComplaintDataUserExtractType === "createdAt"?
                                                    formatDate(value[1] as Date) :
                                                    capitalize(value[1].toString())
                                        }
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
};