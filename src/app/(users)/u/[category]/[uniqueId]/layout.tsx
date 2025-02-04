import UserMenu from "@/components/UserMenu/UserMenu";
import { ChildrenType } from "@/types/childrenType";

export default function UserLayout({
    children
}: ChildrenType
) {
    return (
        <div className="h-full flex items-center justify-start rounded-lg bg-panel-background overflow-hidden [&_>_*]:h-full">
            <UserMenu />
            {children}
        </div>
    )
};