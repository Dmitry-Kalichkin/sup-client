export enum Role {
    ADMIN = "ADMIN",
    DEANERY = "DEANERY",
    STUDENT = "USER",
    TEACHER = "TEACHER"
}

export const translations = new Map<Role, string>([
    [Role.ADMIN, "Администратор"],
    [Role.DEANERY, "Деканат"],
    [Role.STUDENT, "Студент"],
    [Role.TEACHER, "Преподаватель"]
]);