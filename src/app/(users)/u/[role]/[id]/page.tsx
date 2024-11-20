import { UserKeyType, UserType } from "@/types/userTypes";
import Panel from "@/components/Panel/Panel";

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
        <Panel />
    );
};
