"use client";

import { AdminCategoriesType, AdminType, UserCategoriesType, UserType } from "@/models";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type ProfileInformationContextStateType = (Omit<UserType | AdminType, "_id" | "category" | "password" | "complaints" | "updatedAt"> & {
	category: UserCategoriesType | AdminCategoriesType;
}) | null;
type ProfileInformationContextValueType = {
	profileInformation: ProfileInformationContextStateType;
	setProfileInformation: Dispatch<SetStateAction<ProfileInformationContextStateType>>;
};

export const ProfileInformationContext = createContext<ProfileInformationContextValueType | null>(null);

export default function ProfileInformationContextProvider({ children }: Readonly<{
	children: React.ReactNode
}>) {
	const [profileInformation, setProfileInformation] = useState<ProfileInformationContextStateType>(null);
	
	return (
		<ProfileInformationContext.Provider value={{ profileInformation, setProfileInformation }}>
			{children}
		</ProfileInformationContext.Provider>
	)
};

export function useProfileInformationContext(): ProfileInformationContextValueType {
	const context = useContext(ProfileInformationContext);

	if (context === null) {
		throw new Error("We have no context");
	}

	return context;
};