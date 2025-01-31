"use client";

import { useState } from "react";

export default function Import() {
	const [data, setData] = useState<Record<string, unknown>>({});

	const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		const reader = new FileReader();

		await new Promise((res, rej) => {
			reader.onload = (e) => {
				console.log("onload");
				try {
					const newData = JSON.parse(e.target?.result as string);
					setData(newData);
					res("success")
				} catch (error) {
					rej("error")
					console.error("Invalid JSON file:", error);
				}
			};

			reader.readAsText(file);
			console.log("start");
		});
		
		console.log("done");
	};

	return (
		<div className="p-4 border rounded shadow-md">
			<input type="file" accept=".json" onChange={handleFileUpload} className="mb-4" />
			{data && (
				<pre className="p-2 bg-gray-100 rounded overflow-auto">
					{JSON.stringify(data, null, 2)}
				</pre>
			)}
		</div>
	);
}
