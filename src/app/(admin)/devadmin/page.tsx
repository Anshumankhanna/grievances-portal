"use client";

import makeDevAdmin from "@/actions/makeDevAdmin";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DevadminPage() {
	const [key, setKey] = useState<string>("");
	const router = useRouter();

	const handleSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
		submitEvent.preventDefault();

		const { error } = await makeDevAdmin(key);

		if (error) {
			console.error(error);
		} else {
			signOut({ redirect: false }).then(() => {
				router.push("/")
			});
		}
	}

	return (
		<div className="flex justify-center items-center rounded-lg">
			<form className="bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 form" onSubmit={handleSubmit}>
				<h1>Please validate using the devadmin key</h1>
				<input type="password" value={key} onChange={(changeEvent) => setKey(changeEvent.target.value)} />
			</form>
		</div>
	);
}