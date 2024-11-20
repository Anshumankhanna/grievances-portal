import { UserKeyType, UserType } from "@/types/userTypes";

type RolePageProps = {
    // always the body of 'params' should be a promise in nextjs 15.
    params: Promise<{
        role: UserKeyType
    }>;
}

export default async function UserPage({ params }: RolePageProps) {
    const { role } = await params;
    const roleFullForm = UserType[role]; //eslint-disable-line

    return (
        <div className="h-full flex items-center justify-center rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
            <div className="bg-tertiary-color w-44 flex flex-col justify-start items-center py-3 gap-3 [&_>_*]:w-full [&_>_*:hover]:bg-white ">
                <div>
                    Contents
                </div>
                <div>
                    Dashboard
                </div>
                <div>Profile</div>
            </div>
            <div className="flex-grow"></div>
        </div>
    );
};
