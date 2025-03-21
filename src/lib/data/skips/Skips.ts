import type { Pagination } from "../Pagination"
import type { Reason } from "./Reason"
import type { Status } from "./Status"

export interface SkipsPage extends GenericSkipsPage<SkipPageEntry>{}

export interface MySkipsPage extends GenericSkipsPage<MySkipsPageEntry> {}

export interface SkipPageEntry extends BasicPageEntry {
    fullName: string,
    group: string | null
}

export interface MySkipsPageEntry extends BasicPageEntry {}

interface BasicPageEntry {
    id: number,
    status: Status,
    reason: Reason,
    startDate: Date,
    endDate: Date,
    files: string[]
}

interface GenericSkipsPage<T extends BasicPageEntry> {
    pagination: Pagination
    skips: T[]
}

export interface Skip {
    reason: Reason,
    startDate: Date,
    endDate: Date,
    files: any[]
}

export interface SkipExtension {
    newFiles: string[],
    endDate: Date,
}