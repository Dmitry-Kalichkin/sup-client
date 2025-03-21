import { Reason } from "$lib/data/skips/Reason";
import type { MySkipsPage, Skip, SkipsPage } from "$lib/data/skips/Skips";
import type { MySkipsParameters, SkipsParameters } from "$lib/data/skips/SkipsParameters";
import { getStatus, Status, stringifyStatus } from "$lib/data/skips/Status";
import { BaseClient } from "./BaseClient";

export class SkipsClient extends BaseClient {
    public async createSkip(skip: FormData): Promise<void> {
        await this.postWithFiles('skips', skip);
    }

    public async extendSkip(id: number, skip: FormData): Promise<void> {
        await this.postWithFiles('skips/' + id + '/extend', skip);
    }

    public async exportSkips(parameters: SkipsParameters): Promise<string> {
        const response = await this.get('skips/export/filtered', null);
        const json = await response.json();
        return json.file_url;
    }

    public async changeStatus(id: number, status: Status): Promise<void> {
        await this.post('skips/' + id + '/status', { status: stringifyStatus(status) });
    }

    public async getSkips(parameters: SkipsParameters): Promise<SkipsPage> {
        const params = new URLSearchParams();
        if (parameters.fullName) {
            params.set('student_name', parameters.fullName);
        }
        if (parameters.status) {
            params.set('status', stringifyStatus(parameters.status));
        }
        if (parameters.reason) {
            params.set('reason', parameters.reason.toString());
        }
        if (parameters.startDate) {
            params.set('start_date', parameters.startDate);
        }
        if (parameters.endDate) {
            params.set('end_date', parameters.endDate);
        }
        params.set('page', parameters.page.toString());
        params.set('per_page', 5);
        const response = await this.get('skips', params);
        const page = await response.json();
        return {
            pagination: page.pagination,
            skips: page.data.map(skip => {
                return {
                    id: skip.id,
                    fullName: skip.user.fullName,
                    group: skip.user.group_id,
                    status: getStatus(skip.status),
                    reason: (skip.reason ? skip.reason as Reason : Reason.OTHER) ?? Reason.OTHER,
                    startDate: this.toDate(skip.start_date), 
                    endDate: this.toDate(skip.end_date),
                    files: JSON.parse(skip.document_paths)
                }
            })
        };
    }

    public async getMySkips(parameters: MySkipsParameters): Promise<MySkipsPage> {
        const response = await this.get('skips/my-filtered', null);
        const page = await response.json();
        return {
            pagination: page.pagination,
            skips: page.data.map(skip => {
                return {
                    id: skip.id,
                    status: getStatus(skip.status),
                    reason: (skip.reason ? skip.reason as Reason : Reason.OTHER) ?? Reason.OTHER,
                    startDate: this.toDate(skip.start_date), 
                    endDate: this.toDate(skip.end_date),
                    files: JSON.parse(skip.document_paths)
                }
            })
        };
    }

    public toDate(date: string): Date {
        return new Date(date);
    }
}

export const skipsClient = new SkipsClient();