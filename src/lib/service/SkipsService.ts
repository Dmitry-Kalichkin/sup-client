import type { SkipsClient } from "$lib/client/SkipsClient";
import type { MySkipsPage, Skip, SkipsPage } from "$lib/data/skips/Skips";
import type { MySkipsParameters, SkipsParameters } from "$lib/data/skips/SkipsParameters";
import { skipsClient } from "$lib/client/SkipsClient";
import { groupService, type GroupService } from "./GroupService";

export class SkipsService {
    private readonly skipsClient: SkipsClient;
    private readonly groupService: GroupService;

    constructor(skipsClient: SkipsClient, groupService: GroupService = groupService) {
        this.skipsClient = skipsClient;
        this.groupService = groupService;
    }

    public async createSkip(skip: FormData): Promise<void> {
        await this.skipsClient.createSkip(skip);
    }

    public async getSkips(parameters: SkipsParameters): Promise<SkipsPage> {
        const skips = await this.skipsClient.getSkips(parameters);
        const groups = await this.groupService.getGroups();
        return {
            pagination: skips.pagination,
            skips: skips.skips.map(skip => {
                skip.group = groups.filter(group => skip.group == group.id)[0]?.group_number;
                return skip;
            })
        };
    }

    public async getMySkips(parameters: MySkipsParameters): Promise<MySkipsPage> {
        return await this.skipsClient.getMySkips(parameters);
    }
}

export const skipsService = new SkipsService(skipsClient, groupService);