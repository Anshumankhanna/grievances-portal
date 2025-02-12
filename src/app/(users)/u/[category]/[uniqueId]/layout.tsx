import UserMenu from "@/components/UserMenu/UserMenu";
import ProfileInformationContextProvider from "@/context/ProfileInformationContext";
import { ChildrenType } from "@/types/childrenType";
import UserSideComplaintsContextProvider from "./UserSideComplaintsContext";

export default function UserLayout({
    children
}: ChildrenType
) {
    return (
        <ProfileInformationContextProvider>
            <UserSideComplaintsContextProvider>
                <div className="h-full flex items-center justify-start rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
                    <UserMenu />
                    {children}
                </div>
            </UserSideComplaintsContextProvider>
        </ProfileInformationContextProvider>
    )
};