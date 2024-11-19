import { UserKeyType, UserModel } from "@/types/userTypes";

type RolePageProps = {
    // always the body of 'params' should be a promise in nextjs 15.
    params: Promise<{
        role: UserKeyType
    }>;
}

export default async function UserPage({ params }: RolePageProps) {
    const { role } = await params;
    const roleFullForm = UserModel[role];

    return (
        <div className="h-full flex items-center justify-center">
            <h1 className="text-4xl">
                Welcome {roleFullForm}
            </h1>
        </div>
    );
};
