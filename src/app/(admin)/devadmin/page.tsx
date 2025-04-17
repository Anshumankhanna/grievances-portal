"use client";

import getBasePath from "@/actions/getBasePath";
import makeDevAdmin from "@/actions/makeDevAdmin";
import { useBasePathContext } from "@/context/BasePathContext";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DevadminPage() {
	const currentPath = usePathname();
	const { setBasePath } = useBasePathContext();
	const [key, setKey] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>("");
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const path = await getBasePath();

			if (path.error || currentPath !== path.result) {
				setBasePath("/");
				return;
			}
		})();
	}, [currentPath, setBasePath]);

	const handleSubmit = async (
		submitEvent: React.FormEvent<HTMLFormElement>,
	) => {
		submitEvent.preventDefault();
		setIsLoading(true);

		const devAdminResult = await makeDevAdmin(key);

		if (devAdminResult.error) {
			console.error(devAdminResult.error);
			setError(devAdminResult.error);
			setTimeout(() => {
				setError("");
			}, 2000);
		} else {
			signOut({ redirect: false }).then(() => {
				router.push("/");
			});
		}

		setIsLoading(false);
	};

	return (
		<div className="flex justify-center items-center rounded-lg">
			<form
				className="bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 form"
				onSubmit={handleSubmit}
			>
				<h1>Please validate using the devadmin key</h1>
				<input
					type="password"
					value={key}
					onChange={(changeEvent) => setKey(changeEvent.target.value)}
				/>
				<button
					className={`${
						error === "" ? "bg-tertiary-color" : "bg-red-500"
					} text-white p-2 rounded-lg font-bold disabled:bg-gray-400`}
					disabled={isLoading}
				>
					{isLoading ? "Trying..." : error !== "" ? error : "Submit"}
				</button>
			</form>
		</div>
	);
}
