import type { Reason } from "./Reason"
import type { Status } from "./Status"

export interface SkipsPage {
    page: number,
    totalPages: number,
    currenctSize: number,
    skips: SkipPageEntry[]
}

export interface SkipPageEntry {
    id: number,
    fullName: string,
    status: Status,
    reason: Reason,
    startDate: Date,
    endDate: Date
}