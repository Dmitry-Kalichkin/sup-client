import type { Group } from "$lib/data/Group";
import { BaseClient } from "./BaseClient";

export class GroupClient extends BaseClient {
    public async getGroups(): Promise<Group[]> {
        const response = await this.get('groups/all', null);
        return response.json();
    }
}

export const groupClient = new GroupClient();