import type { Pagination } from "../Pagination";
import type { Role } from "./Role";

export interface UsersPageParameters {
    fullName: string | null,
    role: Role | null,
    page: number,
    per_page: number
}

export interface UsersPage {
    pagination: Pagination,
    users: UsersPageEntry[]
}

export interface UsersPageEntry {
    id: number,
    name: string,
    email: string,
    skips: number,
    group: string,
    roles: Role[]
}