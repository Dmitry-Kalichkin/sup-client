export enum Status {
    PENDING = "На проверке",
    APPROVED = "Подтвержден",
    REJECTED = "Отклонен"
}

export const StatusColors = new Map<Status, string>([
    [Status.PENDING, "purple"],
    [Status.APPROVED, "green"],
    [Status.REJECTED, "red"]
]);

export function getStatus(status: string): Status {
    switch (status) {
        case "pending":
            return Status.PENDING;
        case "approved":
            return Status.APPROVED;
        case "rejected":
            return Status.REJECTED;
        default:
            return Status.PENDING;
    }
}

export function stringifyStatus(status: Status): string {
    switch (status) {
        case Status.PENDING:
            return "pending";
        case Status.APPROVED:
            return "approved";
        case Status.REJECTED:
            return "rejected";
        default:
            return "pending";
    }
}