interface RolePageProps {
    params: { role: string };
}

const allowedRoles = ["student", "teacher", "parent"];

const UserRolePage = ({ params }: RolePageProps) => {
    const { role } = params;

    if (!allowedRoles.includes(role.toLowerCase())) {
        return <div>Invalid role: {role}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl">
                Welcome {role.charAt(0).toUpperCase() + role.slice(1)}!
            </h1>
        </div>
    );
};

export default UserRolePage;
