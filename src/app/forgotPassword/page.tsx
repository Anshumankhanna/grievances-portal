"use client";

import changePassword from "@/actions/changePassword";
import verifyDetails from "@/actions/verifyDetails";
import { useState } from "react";

export default function ForgotPasswordPage() {
	const [uniqueId, setUniqueId] = useState("");
	const [email, setEmail] = useState("");
	const [newPassword, setNewPassword] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const copyContent = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>): Promise<void> => {
		setIsLoading(true);

		try {
			await navigator.clipboard.writeText(event.currentTarget.textContent ?? "");
		} catch (error) {
			console.error(error);
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};
	const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === "uniqueId") {
			setUniqueId(value);
		} else if (name === "email") {
			setEmail(value);
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();

		setIsLoading(true);
		const verification = await verifyDetails(uniqueId, { email });

		if (verification.error) {
			console.error(verification.error);
			return ;
		}
		if (!verification.result) {
			console.error("Incorrect details");
		}

		const changed = await changePassword(uniqueId);

		if (changed.error) {
			console.error(changed.error);
			return ;
		}

		setNewPassword(changed.result);
		setIsLoading(false);
	};
	return (
		<div className="flex justify-center items-center rounded-lg">
            <form className="grid grid-cols-2 bg-panel-background p-4 rounded-lg gap-y-5" onSubmit={handleSubmit}>
				<h1 className="col-span-2 text-3xl text-black text-center text-tertiary-color font-bold">Forgot Password?</h1>
				<label htmlFor="uniqueId">UniqueId:</label>
				<input type="text" name="uniqueId" id="uniqueId" onChange={handleFormDataChange} required />
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" id="email" onChange={handleFormDataChange} required />
				{newPassword?
					<>
						<div>New Password:</div>
						<div className="p-2 rounded-lg bg-white border border-black cursor-pointer" onClick={copyContent}>{!isLoading? newPassword : "Copied!"}</div>
					</>
					:
					<button type="submit" className="col-span-2 bg-tertiary-color text-white p-2 rounded-lg font-bold disabled:bg-gray-500" disabled={isLoading}>Submit</button>
				}
			</form>
        </div>
	);
}