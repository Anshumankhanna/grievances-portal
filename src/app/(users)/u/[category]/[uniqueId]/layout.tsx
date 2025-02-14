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
                <div className="
                    flex flex-col sm:flex-row justify-start
                    h-full
                    rounded-lg
                    bg-panel-background
                    overflow-auto
                    [&_>_*]:w-full [&_>_*]:sm:w-auto [&_>_*]:sm:h-full
                    "
                >
                    <UserMenu />
                    {children}
                </div>
            </UserSideComplaintsContextProvider>
        </ProfileInformationContextProvider>
    )
};