//profile page: photo, enroll no., user name, mother father, addresss, phone number branch year of graduation
"use client";
import React, { useState } from "react"; //eslint-disable-line
import { UserProfile } from "@/types/userTypes";

export default function Profile() {
    const [user, setUser] = useState<UserProfile>({
        photo: "image.png",
        enrollNo: 123456,
        name: "John Doe",
        motherName: "Jane Doe",
        fatherName: "Richard Roe",
        address: "123 Main Street, Anytown, USA",
        phoneNumber: "123-456-7890",
        branch: "Computer Science",
        yearOfGraduation: 2025,
    });

    const [isEdit, setEdit] = useState(false);

    const handleToggle = () => {
        setEdit((prev) => !prev); // Toggle edit mode
    };

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("New data:", user);

        setEdit(false);
    };

    return (
        <div className="p-3 h-full mx-auto bg-white rounded-lg shadow-md overflow-visible">
            <h1 className="text-2xl font-bold mb-4">User Profile</h1>
            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Photo */}

                {/* Enrollment Number and Name */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">
                            Enrollment No.
                        </label>
                        <input
                            type="text"
                            value={user.enrollNo}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>

                {/* Editable Fields */}
                {[
                    { label: "Mother's Name", field: "motherName" },
                    { label: "Father's Name", field: "fatherName" },
                    { label: "Address", field: "address" },
                    { label: "Phone Number", field: "phoneNumber" },
                ].map(({ label, field }) => (
                    <div key={field}>
                        <label className="block text-gray-700">{label}</label>
                        <input
                            type="text"
                            value={user[field as keyof UserProfile]}
                            onChange={(e) => {
                                if (isEdit) {
                                    setUser({
                                        ...user,
                                        [field]: e.target.value,
                                    });
                                }
                            }}
                            readOnly={!isEdit}
                            className={`w-full p-2 border rounded ${
                                isEdit ? "" : "bg-gray-100"
                            }`}
                        />
                    </div>
                ))}

                {/* Branch and Year of Graduation */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Branch</label>
                        <input
                            type="text"
                            value={user.branch}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Year of Graduation
                        </label>
                        <input
                            type="text"
                            value={user.yearOfGraduation}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100"
                        />
                    </div>
                </div>

                {/* Save and Edit Buttons */}
                <div className="flex justify-end space-x-4">
                    {isEdit ? (
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleToggle}
                            className="bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
