import UserMenu from "@/components/UserMenu/UserMenu";
import { ChildrenType } from "@/types/childrenType";

export default function UserLayout({ children }: ChildrenType) {
    return (
        <div className="flex flex-col md:flex-row w-full h-full rounded-lg bg-panel-background overflow-hidden mx-auto">
            <UserMenu />
            {children}
        </div>
    );
}
// <div className="flex flex-col md:flex-row w-full h-full">
//   {/* UserMenu - Sidebar on md+, Horizontal Menu on Mobile */}
//   <UserMenu className="flex md:flex-col w-full md:w-[250px] bg-panel-background" />

//   {/* Main Content */}
//   <div className="flex-1">{children}</div>
// </div>
