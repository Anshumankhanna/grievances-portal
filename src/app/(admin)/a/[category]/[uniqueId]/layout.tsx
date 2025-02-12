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
                <div className="h-full flex items-center justify-start rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
                    <AdminMenu />
                    {children}
                </div>
            </AdminSideComplaintsContextProvider>
        </ProfileInformationContextProvider>
    )
};