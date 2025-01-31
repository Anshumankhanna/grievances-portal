"use client";

import makeAdmin from "@/actions/makeAdmin";
import { useState } from "react";

export default function AdminPage() {
    const [key, setKey] = useState<string>("");

    const handleSubmit = async (submitEvent: React.FormEvent<HTMLFormElement>) => {
        submitEvent.preventDefault();
        await makeAdmin(key);
    }

	return (
        <div className="flex justify-center items-center rounded-lg">
            <form className="bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 form" onSubmit={handleSubmit}>
                <h1>Please validate using the admin key</h1>
                <input type="password" value={key} onChange={(changeEvent) => setKey(changeEvent.target.value)} />
            </form>
        </div>
    );
}