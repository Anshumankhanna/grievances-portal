import { StatusType } from "@/models";

export default function statusColor(status: StatusType) {
	return status === "resolved"? "rgb(21 128 61)" : "rgb(239 68 68)";
};