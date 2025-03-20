import { Reason } from "$lib/data/skips/Reason";
import type { MySkipsPage, Skip, SkipsPage } from "$lib/data/skips/Skips";
import type { MySkipsParameters, SkipsParameters } from "$lib/data/skips/SkipsParameters";
import { Status } from "$lib/data/skips/Status";
import { BaseClient } from "./BaseClient";

export class SkipsClient extends BaseClient {
    public async createSkip(skip: FormData): Promise<void> {
        await this.postWithFiles('skips', skip);
    }

    public async getSkips(parameters: SkipsParameters): Promise<SkipsPage> {
        await new Promise(res => setTimeout(res, 1000));
        return {
            page: parameters.page,
            totalPages: 5,
            currenctSize: 4,
            skips: [
                {id: 0, fullName: "Иванов Иван Иванович", group: "972103",
                    status: Status.PENDING, reason: Reason.ILL,
                    startDate: new Date(), endDate: new Date(),
                    files: []},
                {id: 1, fullName: "Григорий Петрович Южников", group: null,
                    status: Status.PENDING, reason: Reason.OTHER,
                    startDate: new Date(), endDate: new Date(),
                    files: ["files/file1.txt", "files/file2.txt"]},
                {id: 2, fullName: "Василий Васильевич Васильев", group: "972103",
                    status: Status.APPROVED, reason: Reason.ILL,
                    startDate: new Date(), endDate: new Date(),
                    files: ["files/file1.txt"]},
                {id: 1, fullName: "Григорий Петрович Южников", group: "972103",
                    status: Status.REJECTED, reason: Reason.OTHER, 
                    startDate: new Date(), endDate: new Date(),
                    files: ["files/file1.txt", "files/file2.txt"]},
                {id: 2, fullName: "Василий Васильевич Васильев", group: "972103",
                    status: Status.APPROVED, reason: Reason.ILL,
                    startDate: new Date(), endDate: new Date(),
                    files: ["files/file1.txt"]},
            ]
        };
    }

    public async getMySkips(parameters: MySkipsParameters): Promise<MySkipsPage> {
        const response = await this.get('skips/my', null);
        const page = await response.json();
        return {
            pagination: page.pagination,
            skips: page.data.map(skip => {
                return {
                    id: skip.id,
                    status: skip.status,
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