import { groupClient, type GroupClient } from "$lib/client/GroupClient";
import type { Group } from "$lib/data/Group";

export class GroupService {
    private readonly groupClient: GroupClient;

    constructor(groupClient: GroupClient) {
        this.groupClient = groupClient;
    }

    public async getGroups(): Promise<Group[]> {
        return await this.groupClient.getGroups();
    }
}

export const groupService = new GroupService(groupClient);