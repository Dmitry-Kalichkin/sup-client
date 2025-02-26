import type { Role } from "./Role";

export interface User {
    username: string;
    email: string;
    role: Role;
}