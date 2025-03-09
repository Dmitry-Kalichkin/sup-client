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