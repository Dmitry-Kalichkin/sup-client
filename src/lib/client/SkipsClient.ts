import { Reason } from "$lib/data/skips/Reason";
import type { MySkipsPage, SkipsPage } from "$lib/data/skips/Skips";
import type { MySkipsParameters, SkipsParameters } from "$lib/data/skips/SkipsParameters";
import { Status } from "$lib/data/skips/Status";

export class SkipsClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
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
        await new Promise(res => setTimeout(res, 1000));
        return {
            page: parameters.page,
            totalPages: 5,
            currenctSize: 4,
            skips: [
                {id: 1, status: Status.PENDING, reason: Reason.ILL, startDate: new Date(), endDate: new Date(), files: []},
                {id: 1, status: Status.PENDING, reason: Reason.OTHER, startDate: new Date(), endDate: new Date(), files: ["files/file1.txt", "files/file2.txt", "files/file2.txt", "files/file2.txt"]},
                {id: 2, status: Status.APPROVED, reason: Reason.ILL, startDate: new Date(), endDate: new Date(), files: ["files/file1.txt"]},
                {id: 3, status: Status.REJECTED, reason: Reason.ILL, startDate: new Date(), endDate: new Date(), files: ["files/file1.txt", "files/file2.txt", "files/file2.txt"]},
                {id: 4, status: Status.APPROVED, reason: Reason.ILL, startDate: new Date(), endDate: new Date(), files: ["files/file1.txt", "files/file2.txt"]},
                {id: 5, status: Status.REJECTED, reason: Reason.ILL, startDate: new Date(), endDate: new Date(), files: ["files/file2.txt"]},
            ]
        };
    }
}

export const skipsClient = new SkipsClient('http://localhost/skips');