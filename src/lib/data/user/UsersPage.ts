import type { Role } from "./Role";

export interface UsersPageParameters {
    fullName: string | null,
    roles: Role[] | null,
    page: number
}

export interface UsersPage {
    page: number,
    totalPages: number,
    currenctSize: number,
    users: UsersPageEntry[]
}

export interface UsersPageEntry {
    fullName: string,
    email: string,
    skips: number,
    roles: Role[]
}