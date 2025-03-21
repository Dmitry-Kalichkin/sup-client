<script lang="ts">
    import { skipsService } from "$lib/service/SkipsService";
    import  Page  from "$lib/components/Page.svelte";
    import type { SkipPageEntry, SkipsPage } from "$lib/data/skips/Skips";
    import { writable } from "svelte/store";
    import { parseDate, toServerFormat } from "$lib/utils/DateUtils";
    import { Status, StatusColors } from "$lib/data/skips/Status";
    import VerifySkipModal from "$lib/components/VerifySkipModal.svelte";
    import type { SkipsParameters } from "$lib/data/skips/SkipsParameters";
    import type { Reason } from "$lib/data/skips/Reason";

    let searchParams = $state<URLSearchParams>(new URLSearchParams(window.location.search));
    let pageNumber = $state<number>(searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1);
    let totalPages = $state(1);

    let selectedSkip = $state<SkipPageEntry | null>(null);
    let showSkip = $state(false);

    async function loadSkips(): Promise<SkipsPage> {
        const params: SkipsParameters = { page: pageNumber };
        if (searchParams.get("fullName")) {
            params.fullName = searchParams.get("fullName") as string;
        }
        if (searchParams.get("status")) {
            params.status = searchParams.get("status") as Status;
        }
        if (searchParams.get("reason")) {
            params.reason = searchParams.get("reason") as Reason;
        }
        if (searchParams.get("startDate")) {
            params.startDate = toServerFormat(searchParams.get("startDate") as string);
        }
        if (searchParams.get("endDate")) {
            params.endDate = toServerFormat(searchParams.get("endDate") as string);
        }
        const skips = await skipsService.getSkips(params);
        pageNumber = skips.pagination.current_page;
        totalPages = skips.pagination.last_page;
        return skips;
    }

    function pickSkip(skip: SkipPageEntry) {
        selectedSkip = skip;
        showSkip = true;
    }
</script>

<h1>Пропуски</h1>
<Page loadFunction={loadSkips} content={skipsList} currentPage={pageNumber} totalPages={totalPages} pagesLocation="start"/>
{#if showSkip}
    <VerifySkipModal bind:showModal={showSkip} {selectedSkip} />
{/if}

{#snippet skipsList(skipsPage: SkipsPage)}
    <div class="skips-container">
        {#each skipsPage.skips as skip}
            <div class="skip" onclick={() => pickSkip(skip)}>
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