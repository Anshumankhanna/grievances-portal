// to-do: Add password change feature from here
// Display stats here: Resolved vs unresolved complaints, number of complaints

"use client";

import changePassword from "@/actions/changePassword";
import getUserComplaints, { ComplaintDataUserType } from "@/actions/getUserComplaints";
import verifyDetails from "@/actions/verifyDetails";
import PieChart from "@/components/PieChart/PieChart";
import { AdminType, UserType } from "@/models";
import capitalize from "@/utils/capitalize";
import getMyDetails from "@/utils/getMyDetails";
import statusColor from "@/utils/statusColor";
import Image from "next/image";
import React, { useEffect, useState } from "react"

type PasswordStateType = {
    old: boolean;
    new: boolean;
    confirm: boolean;
}
type PasswordsType = {
    old: string;
    new: string;
    confirm: string;
}

function PasswordComponent({
    name,
    inputValue,
    state,
    stateChangeHandler,
    handlePasswordChange
}: {
    name: string;
    inputValue: string;
    state: boolean;
    stateChangeHandler: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <>
            <label htmlFor={name}>{capitalize(name)} Password:</label>
            <div className="flex gap-2 border border-black rounded-lg overflow-hidden pr-2 bg-white">
                <input
                    className="rounded-none border-t-0 border-l-0 border-b-0 border-gray-400"
                    type={state? "text" : "password"}
                    value={inputValue}
                    name={name}
                    id={name}
                    onChange={handlePasswordChange}
                    required
                />
                <button type="button" onClick={stateChangeHandler} name={name}>
                    <Image src={state? "/images/eye-slash-solid.svg" : "/images/eye-solid.svg"} alt="Show" width={20} height={20} />
                </button>
            </div>
        </>
    );
};

export default function Profile() {
    const [profileData, setProfileData] = useState<Pick<UserType | AdminType, "uniqueId" | "name" | "email" | "mobile" | "createdAt"> | null>(null);
    const [resolved, setResolved] = useState(0);
    const [unresolved, setUnresolved] = useState(0);
    const [dialogState, setDialogState] = useState(false);
    const [passwordState, setPasswordState] = useState<PasswordStateType>({
        old: false,
        new: false,
        confirm: false
    });
    const [passwords, setPasswords] = useState<PasswordsType>({
        old: "",
        new: "",
        confirm: ""
    });
    const [passwordConfirmed, setPasswordConfirmed] = useState(false);
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    useEffect(() => {
        (async () => {
            const details = await getMyDetails("uniqueId", "name", "email", "mobile", "createdAt");
            
            if (details.error || !details.result.uniqueId || !details.result.name || !details.result.email || !details.result.mobile || !details.result.createdAt) {
                return ;
            }
            
            setProfileData({
                uniqueId: details.result.uniqueId,
                name: details.result.name,
                email: details.result.email,
                mobile: details.result.mobile,
                createdAt: details.result.createdAt
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
    useEffect(() => {
        setPasswordConfirmed(passwords.new !== "" && passwords.old !== passwords.new && passwords.new === passwords.confirm);
    }, [passwords]);

    const handlePasswordStateChange = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        const name = event.currentTarget.name;
        const value = passwordState[name as keyof PasswordStateType];

        setPasswordState({
            ...passwordState,
            [name]: !value
        });
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name;
        const value = event.target.value;

        setPasswords({
            ...passwords,
            [name]: value
        });
    }
    const changeUserPassword = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        
        if (!profileData) {
            return ;
        }

        const verification = await verifyDetails(profileData.uniqueId, { password: passwords.old });

        if (verification.error || !verification.result) {
            console.error(verification.error? "Something went wrong" : "Incorrect details");
            setDialogState(false);
            return ;
        }

        const changed = await changePassword(profileData.uniqueId, passwords.new);

        if (changed.error) {
            console.error(changed.error);
            setDialogState(false);
            return ;
        }

        setIsPasswordChanged(true);
        setPasswordState({
            old: false,
            new: false,
            confirm: false
        });
        setPasswords({
            old: "",
            new: "",
            confirm: ""
        });
        setDialogState(false);

        setTimeout(() => {
            setIsPasswordChanged(false);
        }, 2000);
    }

    return (
        <div
            className="flex flex-col sm:grid sm:grid-cols-2 flex-wrap gap-y-8 size-full p-5 justify-between relative"
        >
            <h1 className="text-4xl underline text-center font-bold text-tertiary-color w-full sm:col-span-2">Profile</h1>
            <div className="
                grid grid-cols-2 gap-3
                h-fit
                [&_>_div]:grid [&_>_div]:grid-cols-2 [&_>_div]:items-center
                [&_>_*]:p-2
                [&_>_div]:bg-gray-300
                [&_>_*]:break-words
                [&_>_*]:rounded-lg
                "
            >
                {profileData !== null &&
                    <>
                        <div>
                            <div>ID:</div>
                            <div>{profileData.uniqueId}</div>
                        </div>
                        <div>
                            <div>Name:</div>
                            <div>{profileData.name}</div>
                        </div>
                        <div>
                            <div>Email:</div>
                            <div className="break-words">{profileData.email}</div>
                        </div>
                        <div>
                            <div>Mobile:</div>
                            <div>{profileData.mobile}</div>
                        </div>
                        <div>
                            <div>Created At:</div>
                            <div>{profileData.createdAt.toLocaleString("en-IN")}</div>
                        </div>
                        <div>
                            <div>Complaints:</div>
                            <div>{resolved + unresolved}</div>
                        </div>
                        <button
                            className={`${isPasswordChanged? "bg-green-700" : "bg-tertiary-color" } text-white font-bold disabled:bg-gray-500`}
                            onClick={() => setDialogState(true)}
                            disabled={dialogState}
                        >
                            {isPasswordChanged? "Password Changed!" : "Change Password?"}
                        </button>
                    </>
                }
            </div>
            <PieChart data={[
                {
                    name: "Resolved",
                    color: statusColor("resolved"),
                    portion: resolved
                },
                {
                    name: "Unresolved",
                    color: statusColor("unresolved"),
                    portion: unresolved
                }
            ]} />
            <dialog className="absolute-center bg-panel-background border border-black p-4 rounded-lg" open={dialogState}>
                <form className="grid grid-cols-[1fr_2fr] gap-y-5 items-center" onSubmit={changeUserPassword}>
                    <h1 className="text-4xl underline text-tertiary-color col-span-2 text-center">Change Password</h1>
                    {Object.keys(passwords).map((elem, index) => (
                        <PasswordComponent key={index} name={elem} inputValue={passwords[elem as keyof PasswordsType]} state={passwordState[elem as keyof PasswordStateType]} stateChangeHandler={handlePasswordStateChange} handlePasswordChange={handlePasswordChange} />
                    ))}
                    <div className="col-span-2 grid grid-cols-2 gap-x-4">
                        <button
                            className="rounded-lg p-2 bg-tertiary-color text-white font-bold disabled:bg-gray-500"
                            type="submit"
                            disabled={!passwordConfirmed}
                        >
                            Submit
                        </button>
                        <button
                            className="rounded-lg p-2 bg-tertiary-color text-white font-bold disabled:bg-gray-500"
                            type="button"
                            onClick={() => { setDialogState(false); }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    )
};