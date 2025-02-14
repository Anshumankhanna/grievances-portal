import AdminMenu from "@/components/AdminMenu/AdminMenu";
import ProfileInformationContextProvider from "@/context/ProfileInformationContext";
import { ChildrenType } from "@/types/childrenType";
import AdminSideComplaintsContextProvider from "./AdminSideComplaintsContext";

export default function UserLayout({
    children
}: ChildrenType
) {
    return (
        <ProfileInformationContextProvider>
            <AdminSideComplaintsContextProvider>
                <div className="
                    flex flex-col sm:flex-row justify-start
                    h-full
                    rounded-lg
                    bg-panel-background
                    overflow-auto
                    [&_>_*]:w-full [&_>_*]:sm:w-auto [&_>_*]:sm:h-full
                    "
                >
                    <AdminMenu />
                    {children}
                </div>
            </AdminSideComplaintsContextProvider>
        </ProfileInformationContextProvider>
    )
};