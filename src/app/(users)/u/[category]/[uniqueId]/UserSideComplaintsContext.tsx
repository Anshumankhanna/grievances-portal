"use client";

import { ComplaintDataUserType } from "@/actions/getUserComplaints";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type UserSideComplaintsContextValueType = {
	complaints: ComplaintDataUserType[];
	setComplaints: Dispatch<SetStateAction<ComplaintDataUserType[]>>;
};

export const UserSideComplaintsContext = createContext<UserSideComplaintsContextValueType | null>(null);

export default function UserSideComplaintsContextProvider({ children }: Readonly<{
	children: React.ReactNode
}>) {
	const [complaints, setComplaints] = useState<ComplaintDataUserType[]>([]);
	
	return (
		<UserSideComplaintsContext.Provider value={{ complaints, setComplaints }}>
			{children}
		</UserSideComplaintsContext.Provider>
	);
};

export function useUserSideComplaintsContext(): UserSideComplaintsContextValueType {
	const context = useContext(UserSideComplaintsContext);

	if (context === null) {
		throw new Error("We have no context");
	}

	return context;
};