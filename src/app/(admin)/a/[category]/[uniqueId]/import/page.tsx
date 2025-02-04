"use client";

import importUserData from "@/actions/importUserData";
import { useEffect, useRef, useState } from "react";

type InputSelectType = {
    user: boolean;
    complaint: boolean
}
const InputSelectDefault = {
	user: false,
	complaint: false
};

export default function Import() {
	const [data, setData] = useState<Record<string, unknown>>({}); // eslint-disable-line
	const [inputSelect, setInputSelect] = useState<InputSelectType>(InputSelectDefault);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isFileUploaded, setIsFileUploaded] = useState(false);

	useEffect(() => {
		setInputSelect({
			...InputSelectDefault,
			user: true
		});
	}, [])

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
					const importUserDataOutput = await importUserData(inputSelect.user? "user" : "complaint", newData);

					if (importUserDataOutput.error || !importUserDataOutput.result) {
						console.error(importUserDataOutput.error? importUserDataOutput.error : "Something went wrong");
						return ;
					}

					setIsFileUploaded(true);

					setTimeout(() => {
						setIsFileUploaded(false);
					}, 2000);

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
	};
	const handleSelectInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		const name = event.currentTarget.textContent;
		const key = name? name.toLowerCase() : "user";
		
		setInputSelect({
			...InputSelectDefault,
			[key]: true
		});
	};

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
			<div className="flex-grow flex flex-col gap-3 p-3">
				<div className="p-3 bg-slate-200 rounded-lg">
					{!isFileUploaded? "Nothing selected" : "Done"}
				</div>
				<div className="flex justify-center">
					<input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
					<button
						type="button"
						className="bg-tertiary-color px-5 py-2 rounded-md text-white hover:underline"
						onClick={() => {
							if (fileInputRef.current) {
								fileInputRef.current.click();
							}
						}}
					>
						CHOOSE FILE
					</button>
				</div>
			</div>
		</div>
	);
}
