import type { Role } from "./Role";

export interface User {
    name: string;
    email: string;
    roles: Role[];
}