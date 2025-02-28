"use client";

import changePassword from "@/actions/changePassword";
import forgotPassword from "@/actions/forgotPassword";
import verifyDetails from "@/actions/verifyDetails";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
	const [uniqueId, setUniqueId] = useState("");
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();

	const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const name = event.target.name;
		const value = event.target.value;

		if (name === "uniqueId") {
			setUniqueId(value);
		} else if (name === "email") {
			setEmail(value);
		}
	};
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => { // eslint-disable-line
		event.preventDefault();

		setIsLoading(true);
		const verification = await verifyDetails(uniqueId, { email });

		if (verification.error) {
			console.error(verification.error);
			setError(verification.error);
			return ;
		}
		if (!verification.result) {
			console.error("Incorrect details");
			setError("Incorrect details");
		}
		
		const forgotPasswordOutput = await forgotPassword({ recipientEmail: email });

		if (forgotPasswordOutput.error) {
			console.error(forgotPasswordOutput.error);
			setError(forgotPasswordOutput.error);
			return ;
		}

		const changePasswordOutput = await changePassword(uniqueId, forgotPasswordOutput.result);

		if (changePasswordOutput.error) {
			console.error(changePasswordOutput.error);
			setError(changePasswordOutput.error);
			return ;
		}
		
		setIsLoading(false);
		setMessage("Check your given mail and if we were successful, the page will redirect to login in 5 seconds")

		setTimeout(() => {
			router.push("/");
		}, 5000);
	};

	return (
		<div className="flex justify-center items-center rounded-lg">
            <form className="grid grid-cols-2 bg-panel-background p-4 rounded-lg gap-y-5" onSubmit={handleSubmit}>
				<h1 className="col-span-2 text-3xl text-black text-center text-tertiary-color font-bold">Forgot Password?</h1>
				<label htmlFor="uniqueId">UniqueId:</label>
				<input type="text" name="uniqueId" id="uniqueId" onChange={handleFormDataChange} required />
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" id="email" onChange={handleFormDataChange} required />
				{error !== ""?
					<div className="col-span-2 bg-red-500 text-white p-2 rounded-lg font-bold ">{error}</div>
					:
					message !== ""?
					<div className="col-span-2 bg-green-500 text-white p-2 rounded-lg font-bold ">{message}</div>
					:
					<button type="submit" className="col-span-2 bg-tertiary-color text-white p-2 rounded-lg font-bold disabled:bg-gray-500" disabled={isLoading}>Submit</button>
				}
			</form>
        </div>
	);
}