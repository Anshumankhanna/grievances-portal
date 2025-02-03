import { StatusType } from "@/models";

export default function statusColor(status: StatusType) {
	return status === "resolved"? "#00ff00" : "#ff0000";
}