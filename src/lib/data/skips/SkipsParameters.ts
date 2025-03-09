import type { Reason } from "./Reason";
import type { Status } from "./Status";

export interface MySkipsParameters {
    page: number,
    status: Status | null,
    reason: Reason | null,
    startDate: Date | null,
    endDate: Date | null
}

export interface SkipsParameters extends MySkipsParameters {
    fullName: string | null
}