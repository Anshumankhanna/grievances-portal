// since this component will always be placed inside 'client' components, we don't need to write 'use client' here.
import React, { useState } from "react";

type DropdownMenuProps = {
    onRoleSelect: (role: string) => void; // Callback prop to pass selected role
}

export default function DropdownMenu({ onRoleSelect }: DropdownMenuProps) {
    const [selectedRole, setSelectedRole] = useState<string>("Select Role");
    const [isOpen, setIsOpen] = useState<boolean>(false); // State for dropdown visibility

    const roles = ["Student", "Teacher", "Parent", "Admin"];

    const handleSelect = (role: string) => {
        setSelectedRole(role); // Update dropdown's local state
        onRoleSelect(role); // Notify parent (LoginPage)
        setIsOpen(false); // Close the menu after selecting a role
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Toggle the dropdown visibility
    };

    return (
        <div className="relative w-64 mx-auto my-3">
            {/* Trigger */}
            <button
                className="w-full px-4 text-black py-2 text-left bg-white border border-slate-400 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                onClick={toggleDropdown} // Toggle dropdown visibility on button click
            >
                {selectedRole}
            </button>

            {/* Dropdown Items */}
            {isOpen && (
                <div className="absolute w-full mt-2 bg-white border text-black border-gray-300 rounded-md shadow-lg">
                    {roles.map((role) => (
                        <button
                            key={role}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-200"
                            onClick={() => handleSelect(role)} // Select a role and close the menu
                        >
                            {role}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
