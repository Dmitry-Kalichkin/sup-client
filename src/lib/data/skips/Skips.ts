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
    page: number,
    totalPages: number,
    currenctSize: number,
    skips: T[]
}