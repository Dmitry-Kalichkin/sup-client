<script lang="ts">
    import { skipsService } from "$lib/service/SkipsService";
    import  Page  from "$lib/components/Page.svelte";
    import type { MySkipsPage, MySkipsPageEntry } from "$lib/data/skips/Skips";
    import { writable } from "svelte/store";
    import { parseDate } from "$lib/utils/DateUtils";
    import { StatusColors } from "$lib/data/skips/Status";
    import Modal from "$lib/components/Modal.svelte";
    import LightInput from "$lib/components/LightInput.svelte";
    import FilesList from "$lib/components/FilesList.svelte";

    let showSkipModal = $state(false);
    let selectedSkip = $state<MySkipsPageEntry | null>(null);

    function pickSkip(skip: MySkipsPageEntry) {
        selectedSkip = skip;
        showSkipModal = true;
    }

    async function loadMySkips(): Promise<MySkipsPage> {
        return await skipsService.getMySkips({page: 1, status: null, reason: null, startDate: null, endDate: null});
    }
</script>

<h1>Мои пропуски</h1>
<Page loadFunction={loadMySkips} content={skipsList} currentPage={writable(1)} totalPages={10} pagesLocation="start"/>

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

<Modal bind:showModal={showSkipModal}>
    {#snippet header()}
        <div class="modal-header">
            <h2>
                Пропуск №{selectedSkip?.id}
            </h2>
            {#if selectedSkip?.status}
                <div style="color: {StatusColors.get(selectedSkip.status)}">
                    {selectedSkip.status}
                </div>
            {/if}
        </div>
    {/snippet}
    <LightInput title="Причина:" name="reason" value={selectedSkip?.reason} readonly />
    <LightInput title="Дата начала:" name="startDate" type="date" value={selectedSkip?.startDate} readonly />
    <LightInput title="Действует до:" name="endDate" type="date" value={selectedSkip?.endDate} />
    <FilesList files={selectedSkip?.files} onRemove={() => {}} onAdd={() => {}} />
</Modal>

<style>
    h1 {
        font-size: 32px;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 24px;
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

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>