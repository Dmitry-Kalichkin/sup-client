import type { Role } from "./Role";

export interface UpdateUser {
    user_id: number,
    roles: Role[],
    group_number?: string
}