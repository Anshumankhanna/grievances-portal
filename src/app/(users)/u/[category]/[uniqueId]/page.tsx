"use client";

import getUserDetails from "@/utils/getUserDetails";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ComplaintDataFillType, ComplaintDataUserExtractType } from "@/types/complaintTypes";
import addComplaint from "@/actions/addComplaint";

type UserData = {
    uniqueId: string;
    name: string;
    complaints: ComplaintDataUserExtractType[];
}

export default function Page() {
    const [userData, setUserData] = useState<UserData>({
        uniqueId: "",
        name: "",
        complaints: [],
    });
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
            
            const { error, result } = await getUserDetails(session.user.uniqueId, "uniqueId", "name", "complaints");

            if (error !== null || result.uniqueId === undefined || result.name === undefined || result.complaints === undefined) {
                console.error(error);
                return ;
            }

            setUserData({
                uniqueId: result.uniqueId,
                name: result.name,
                complaints: result.complaints,
            })
        })()
    }, []);

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
        
        const { error, result } = await addComplaint(formData);

        if (error !== null) {
            console.log(error);
        } else {
            setDialogState(false);
            console.log(result);
        }
    };

    return (
        <div
            className="flex flex-grow flex-col
                w-44 h-full
                text-black
            "
        >
            {/* this is the nav-strip */}
            <div className="h-24 flex justify-between px-10 py-5">
                <div className="flex flex-col justify-between">
                    <div>{userData.name}</div>
                    <div className="text-blue-400">{userData.uniqueId}</div>
                </div>
                <div className="flex justify-center items-center">
                    <button
                        className="bg-tertiary-color rounded-md px-6 py-3 font-semibold underline text-white"
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
                                    className="full text-black p-1"
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
            </div>
            {/* this is where the content is displayed */}
            <div className="flex-grow h-72 overflow-y-auto p-3">
                {/* add all data here in a well displayed manner */}
                {userData.complaints.length > 0 &&
                    userData.complaints.map(elem => ( //eslint-disable-line
                        <div key={1}>{elem.subject}</div>
                    ))
                }
            </div>
        </div>
    )
};