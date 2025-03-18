<script lang="ts">
    import { skipsService } from "$lib/service/SkipsService";
    import  Page  from "$lib/components/Page.svelte";
    import type { MySkipsPage, MySkipsPageEntry, Skip, SkipExtension } from "$lib/data/skips/Skips";
    import { writable } from "svelte/store";
    import { parseDate } from "$lib/utils/DateUtils";
    import { StatusColors } from "$lib/data/skips/Status";
    import ExtendSkipModal from "$lib/components/ExtendSkipModal.svelte";
    import CreateSkipModal from "$lib/components/CreateSkipModal.svelte";

    let showExtendSkipModal = $state(false);
    let showCreateSkipModal = $state(false);
    let selectedSkip = $state<MySkipsPageEntry | null>(null);

    async function loadMySkips(): Promise<MySkipsPage> {
        return await skipsService.getMySkips({page: 1, status: null, reason: null, startDate: null, endDate: null});
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
<Page loadFunction={loadMySkips} content={skipsList} currentPage={writable(1)} totalPages={10} pagesLocation="start"/>
<CreateSkipModal bind:showModal={showCreateSkipModal} />
<ExtendSkipModal bind:showModal={showExtendSkipModal} {selectedSkip} />

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