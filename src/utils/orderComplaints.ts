export type OrderComplaintType = {
    createdAt: Date;
    [key: string]: unknown;
};

export default function orderComplaints(complaints: OrderComplaintType[], order: "asc" | "desc" = "asc"): void {
    complaints.sort((a, b) => {
        return order === "asc"? a.createdAt.getTime() - b.createdAt.getTime() : b.createdAt.getTime() - a.createdAt.getTime();
    });
};