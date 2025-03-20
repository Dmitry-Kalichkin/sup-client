<script lang="ts">
    import { read } from "$app/server";
import { Status, StatusColors } from "$lib/data/skips/Status";
    import { parseFormDate } from "$lib/utils/DateUtils";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable(), selectedSkip } = $props();
    let endDate = $state< string | null>(parseFormDate(selectedSkip.endDate));
    let files = $state<any[]>([]);

    function onsubmit(e: SubmitEvent) {
        console.log(endDate, files);
    }

    $effect(() => {
        endDate = parseFormDate(selectedSkip.endDate);
        return () => {endDate = null};
    });
</script>

<Modal bind:showModal={showModal} onsubmit={selectedSkip.status === Status.APPROVED ? onsubmit : null}>
    {#snippet header()}
        <div class="modal-header">
            <h2>
                Пропуск №{selectedSkip.id}
            </h2>
            {#if selectedSkip?.status}
                <div style="color: {StatusColors.get(selectedSkip.status)}">
                    {selectedSkip.status}
                </div>
            {/if}
        </div>
    {/snippet}
    <LightInput title="Причина:" name="reason" value={selectedSkip.reason} readonly />
    <LightInput title="Дата начала:" name="startDate" type="date" value={parseFormDate(selectedSkip.startDate)} readonly />
    <LightInput title="Действует до:" name="endDate" type="date" bind:value={endDate} readonly={selectedSkip.status !== Status.APPROVED}/>
    <FilesList files={selectedSkip.files} onAdd={selectedSkip.status === Status.APPROVED ? () => {} : null} />
</Modal>

<style>
    h2 {
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>