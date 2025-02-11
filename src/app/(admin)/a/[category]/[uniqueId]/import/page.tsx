"use client";

import importUserData from "@/actions/importUserData";
import React, { useEffect, useRef, useState } from "react";

type InputSelectType = {
    user: boolean;
    complaint: boolean
}
const InputSelectDefault = {
	user: false,
	complaint: false
};

export default function Import() {
	const [data, setData] = useState<Record<string, unknown> | null>(null); // eslint-disable-line
	const [inputSelect, setInputSelect] = useState<InputSelectType>(InputSelectDefault);
	const [isLoading, setIsLoading] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setInputSelect({
			...InputSelectDefault,
			user: true
		});
	}, [])

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
		const file = event.target.files?.[0];

		if (!file || file.name.slice(-5) !== ".json") {
			return;
		}

		const reader = new FileReader();

		await new Promise(async (res, rej) => {
			reader.onload = async (readEvent: ProgressEvent<FileReader>) => {
				try {
					if (!readEvent.target) {
						rej("error");
						return ;
					}

					const newData = JSON.parse(readEvent.target.result as string);

					setData(newData);
					res("success");
				} catch (error) {
					console.error("Invalid JSON file:", error);
					rej("error");
				}

				return ;
			};

			reader.readAsText(file);
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};
	const handleSelectInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		const name = event.currentTarget.textContent;
		const key = name? name.toLowerCase() : "user";
		
		setInputSelect({
			...InputSelectDefault,
			[key]: true
		});
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		setIsLoading(true);

		if (data === null) {
			setIsLoading(false);
			return ;
		}

		const importUserDataOutput = await importUserData(inputSelect.user? "user" : "complaint", data);

		if (importUserDataOutput.error) {
			console.error(importUserDataOutput.error);
			return ;
		}

		setData(Object.fromEntries(importUserDataOutput.result.map((elem, index) => [index, elem])));
		setIsLoading(false);
	}

	return (
		<div className="size-full flex flex-col">
			{/* this div will display import type */}
			<div className="flex h-11 bg-gray-500 font-bold text-xl">
				<div
					className={`flex-1 p-2 cursor-pointer text-center rounded-t-lg text-black ${inputSelect.user? "bg-panel-background" : "bg-transparent"}`}
					onClick={handleSelectInput}
				>
					User
				</div>
				<div
					className={`flex-1 p-2 cursor-pointer text-center rounded-t-lg text-black ${inputSelect.complaint? "bg-panel-background" : "bg-transparent"}`}
					onClick={handleSelectInput}
				>
					Complaint
				</div>
			</div>
			<form className="flex-grow flex flex-col gap-3 p-3" onSubmit={handleSubmit}>
				<div className="flex justify-between">
					<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
					<button
						type="button"
						className="bg-tertiary-color px-5 py-2 uppercase rounded-md text-white hover:underline"
						onClick={() => {
							if (fileInputRef.current) {
								fileInputRef.current.click();
							}
						}}
					>
						CHOOSE FILE
					</button>
					<button
						type="submit"
						className="bg-tertiary-color px-5 py-2 rounded-md uppercase text-white hover:underline disabled:bg-gray-400"
						disabled={isLoading}
					>
						Submit
					</button>
				</div>
				<pre className="p-3 bg-slate-200 rounded-lg text-wrap">
					{data? JSON.stringify(data, null, 4) : "Nothing selected"}
				</pre>
			</form>
		</div>
	);
}
