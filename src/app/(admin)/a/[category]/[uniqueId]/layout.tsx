import AdminMenu from "@/components/AdminMenu/AdminMenu";
import { ChildrenType } from "@/types/childrenType";

export default function UserLayout({
    children
}: ChildrenType
) {
    return (
        <div className="h-full flex items-center justify-start rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
            <AdminMenu />
            {children}
        </div>
    )
};