export enum Role {
    ADMIN = "admin",
    DEANERY = "dean",
    STUDENT = "student",
    TEACHER = "teacher"
}

export const translations = new Map<Role, string>([
    [Role.ADMIN, "Администратор"],
    [Role.DEANERY, "Деканат"],
    [Role.STUDENT, "Студент"],
    [Role.TEACHER, "Преподаватель"]
]);