<script lang="ts">
    import { skipsService } from "$lib/service/SkipsService";
    import  Page  from "$lib/components/Page.svelte";
    import type { SkipsPage } from "$lib/data/skips/Skips";
    import { writable } from "svelte/store";
    import { parseDate } from "$lib/utils/DateUtils";
    import { StatusColors } from "$lib/data/skips/Status";

    async function loadSkips(): Promise<SkipsPage> {
        return await skipsService.getSkips({page: 1, status: null, reason: null, startDate: null, endDate: null, fullName: null});
    }
</script>

<h1>Пропуски</h1>
<Page loadFunction={loadSkips} content={skipsList} currentPage={writable(1)} totalPages={10}/>

{#snippet skipsList(entry: SkipsPage) }
    <div>
        {#each entry.skips as skip, i}
            <div class="skip">
                <div class="">
                    <div class="skip-id">Пропуск №{skip.id}</div>
                    <div class="skip-user">{skip.fullName}</div>
                    <div>
                        {skip.reason}, {parseDate(skip.startDate)} - {parseDate(skip.endDate)}
                    </div>
                </div>
                <div style="color: {StatusColors.get(skip.status)}">{skip.status}</div>
            </div>
        {/each}
    </div>
{/snippet}

<style>
        h1 {
        font-size: 32px;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .skip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .skip:hover {
        background-color: var(--brand-color);
        color: white;
        transition: all 0.2s ease-in-out;
    }

    .skip-id {
        opacity: 0.5;
    }

    .skip-user {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
    }
</style>