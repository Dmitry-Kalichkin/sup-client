<script lang="ts">
    import { skipsService } from "$lib/service/SkipsService";
    import  Page  from "$lib/components/Page.svelte";
    import type { MySkipsPage, MySkipsPageEntry, Skip, SkipExtension } from "$lib/data/skips/Skips";
    import { writable } from "svelte/store";
    import { parseDate, toServerFormat } from "$lib/utils/DateUtils";
    import { Status, StatusColors } from "$lib/data/skips/Status";
    import ExtendSkipModal from "$lib/components/ExtendSkipModal.svelte";
    import CreateSkipModal from "$lib/components/CreateSkipModal.svelte";
    import type { MySkipsParameters } from "$lib/data/skips/SkipsParameters";
    import type { Reason } from "$lib/data/skips/Reason";

    let showExtendSkipModal = $state(false);
    let showCreateSkipModal = $state(false);
    let selectedSkip = $state<MySkipsPageEntry | null>(null);
    
        let searchParams = $state<URLSearchParams>(new URLSearchParams(window.location.search));
    let pageNumber = $state<number>(searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1);
    let totalPages = $state(1);

    async function loadMySkips(): Promise<MySkipsPage> {
        const params: MySkipsParameters = { page: pageNumber };
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
        const skips = await skipsService.getMySkips(params);
        pageNumber = skips.pagination.current_page;
        totalPages = skips.pagination.last_page;
        return skips;
    }

    function pickSkip(skip: MySkipsPageEntry) {
        selectedSkip = skip;
        showExtendSkipModal = true;
    }
</script>

<div class="title-container">
    <h1>Мои пропуски</h1>
    <button onclick={() => showCreateSkipModal = true}>
        <img src="/images/plus-icon.svg" alt="Добавить пропуск">
    </button>
</div>
<Page loadFunction={loadMySkips} content={skipsList} currentPage={pageNumber} totalPages={totalPages} pagesLocation="start"/>
<CreateSkipModal bind:showModal={showCreateSkipModal} />
{#if selectedSkip}
    <ExtendSkipModal bind:showModal={showExtendSkipModal} {selectedSkip} />
{/if}

{#snippet skipsList(skipsPage: MySkipsPage) }
    <div class="skips-container">
        {#each skipsPage.skips as skip}
            <div class="skip" onclick={() => pickSkip(skip)}>
                <div>
                    <div class="skip-id">Пропуск №{skip.id}</div>
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
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
    }

    .title-container {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 5px;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: 0px;
        padding-bottom: 5px;
        cursor: pointer;
    }

    img {
        width: 14px;
        height: 14px;
        filter: invert(100%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(100%) contrast(100%);
    }
</style>