import type { Role } from "./Role";

export interface User {
    fullName: string;
    email: string;
    roles: Role[];
}