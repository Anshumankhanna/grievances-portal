"use client";

import { ComplaintDataAdminType } from "@/actions/getComplaints";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type AdminSideComplaintsContextValueType = {
	complaints: ComplaintDataAdminType[];
	setComplaints: Dispatch<SetStateAction<ComplaintDataAdminType[]>>;
};

export const AdminSideComplaintsContext = createContext<AdminSideComplaintsContextValueType | null>(null);

export default function AdminSideComplaintsContextProvider({ children }: Readonly<{
	children: React.ReactNode
}>) {
	const [complaints, setComplaints] = useState<ComplaintDataAdminType[]>([]);
	
	return (
		<AdminSideComplaintsContext.Provider value={{ complaints, setComplaints }}>
			{children}
		</AdminSideComplaintsContext.Provider>
	)
};

export function useAdminSideComplaintsContext(): AdminSideComplaintsContextValueType {
	const context = useContext(AdminSideComplaintsContext);

	if (context === null) {
		throw new Error("We have no context");
	}

	return context;
};
