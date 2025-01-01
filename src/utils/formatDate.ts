/* eslint-disable */

export default function formatDate(date: Date): string {
    const datePart = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(4, "0");

    return `${datePart}/${month}/${year}`;
}