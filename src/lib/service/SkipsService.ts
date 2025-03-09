import type { SkipsClient } from "$lib/client/SkipsClient";
import type { SkipsPage } from "$lib/data/skips/Skips";
import type { MySkipsParameters, SkipsParameters } from "$lib/data/skips/SkipsParameters";
import { skipsClient } from "$lib/client/SkipsClient";

export class SkipsService {
    private readonly skipsClient: SkipsClient;

    constructor(skipsClient: SkipsClient) {
        this.skipsClient = skipsClient;
    }

    public async getSkips(parameters: SkipsParameters): Promise<SkipsPage> {
        return await this.skipsClient.getSkips(parameters);
    }

    public async getMySkips(parameters: MySkipsParameters): Promise<SkipsPage> {
        return await this.skipsClient.getMySkips(parameters);
    }
}

export const skipsService = new SkipsService(skipsClient);