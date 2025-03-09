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
<Page loadFunction={loadSkips} content={skipsList} currentPage={writable(1)} totalPages={10} pagesLocation="start"/>

{#snippet skipsList(skipsPage: SkipsPage)}
    <div class="skips-container">
        {#each skipsPage.skips as skip}
            <div class="skip">
                <div class="">
                    <div class="skip-id">Пропуск №{skip.id}</div>
                    <div class="skip-title">
                        <p class="skip-user">{skip.fullName}</p>
                        <p class="skip-user-group">{skip.group}</p>
                    </div>
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

    .skips-container {
        margin-bottom: 10px;
    }
    
    .skip {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 15px;
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

    .skip-title {
        display: flex;
        gap: 2px;
    }

    .skip-user {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .skip-user-group {
        font-size: 12px;
        opacity: 0.7;
    }
</style>