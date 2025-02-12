"use client";

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ComplaintStatusContextStateType = {
	unresolved: number;
	resolved: number;
};
type ComplaintStatusContextValueType = {
	statuses: ComplaintStatusContextStateType;
	setStatuses: Dispatch<SetStateAction<ComplaintStatusContextStateType>>;
};
export const DefaultComplaintStatusContextState: ComplaintStatusContextStateType = {
	unresolved: 0,
	resolved: 0
};

export const ComplaintStatusContext = createContext<ComplaintStatusContextValueType | null>(null);

export default function ComplaintStatusContextProvider({ children }: Readonly<{
	children: React.ReactNode
}>) {
	const [statuses, setStatuses] = useState<ComplaintStatusContextStateType>(DefaultComplaintStatusContextState);
	
	return (
		<ComplaintStatusContext.Provider value={{ statuses, setStatuses }}>
			{children}
		</ComplaintStatusContext.Provider>
	)
};

export function useComplaintStatusContext(): ComplaintStatusContextValueType {
	const context = useContext(ComplaintStatusContext);

	if (context === null) {
		throw new Error("We have no context");
	}

	return context;
};