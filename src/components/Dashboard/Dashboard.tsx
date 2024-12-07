export default function Dashboard() {
    return (
        <div className="full flex flex-col gap-2 [&_>_*]:rounded-lg">
            {/* this is the nav-strip */}
            <div className="h-24 border border-red-500">

            </div>
            {/* this is where the content is displayed */}
            <div className="flex-grow h-72 border border-blue-500 overflow-y-auto p-3">
                
            </div>
        </div>
    );
};