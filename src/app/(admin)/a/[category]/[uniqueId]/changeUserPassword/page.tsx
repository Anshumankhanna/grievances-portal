"use client";

import changePassword from "@/actions/changePassword";
import React, { useEffect, useState } from "react";

type DataType = {
	uniqueId: string;
	password: string;
};
const DataDefault: DataType = {
	uniqueId: "",
	password: ""
};

export default function ChangeUserPasswordPage() {
	const [data, setData] = useState<DataType>(DataDefault);
	const [isLoading, setIsLoading] = useState(false);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		setIsLoading(!(data.uniqueId !== "" && data.password !== ""));
	}, [data]);

	const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.name;
		const value = event.target.value;

		setData({
			...data,
			[name]: value
		});
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setIsLoading(true);

		const changed = await changePassword(data.uniqueId, data.password);

		if (changed.error) {
			console.error(changed.error);
		} else {
			setIsChanged(true);

			setTimeout(() => {
				setIsChanged(false);
			}, 1000);
		}

		setIsLoading(false);
	};

	return (
		<div className="flex size-full flex-grow justify-center sm:items-center">
			<form className="grid grid-cols-2 gap-y-3 size-fit p-3 sm:shadow rounded-lg" onSubmit={handleSubmit}>
				<h1 className="col-span-2 text-center text-2xl underline text-primary-color">Change User Password</h1>
				<label htmlFor="uniqueId">Unique ID:</label>
				<input type="text" name="uniqueId" id="uniqueId" value={data.uniqueId} onChange={handleDataChange} />
				<label htmlFor="password">New Password:</label>
				<input type="text" name="password" id="password" value={data.password} onChange={handleDataChange} />
				{isChanged?
					<div className="rounded-lg col-span-2 text-center">Changed!</div>
					:
					<button className="col-span-2 text-white bg-tertiary-color p-2 rounded-lg disabled:bg-gray-500" type="submit" disabled={isLoading}>Submit</button>
				}
			</form>
		</div>
	)
};