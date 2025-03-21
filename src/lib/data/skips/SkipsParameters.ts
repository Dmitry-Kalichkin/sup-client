import type { Reason } from "./Reason";
import type { Status } from "./Status";

export interface MySkipsParameters {
    page: number,
    status?: Status | null,
    reason?: Reason | null,
    startDate?: string | null,
    endDate?: string | null
}

export interface SkipsParameters extends MySkipsParameters {
    fullName?: string | null,
    groupId?: number | null
}