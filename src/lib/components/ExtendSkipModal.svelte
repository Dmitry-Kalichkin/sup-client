<script lang="ts">
    import { read } from "$app/server";
import { Status, StatusColors } from "$lib/data/skips/Status";
    import { skipsService } from "$lib/service/SkipsService";
    import { parseFormDate, toServerFormat } from "$lib/utils/DateUtils";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable(), selectedSkip } = $props();
    let endDate = $state< string | null>(parseFormDate(selectedSkip.endDate));
    let files = $state<any[]>([]);

    async function onsubmit(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        const skip = new FormData();
        skip.set("new_end_date", toServerFormat(formData.get("new_end_date") as string ?? ""));
        formData.getAll("documents").forEach((file) => {
            if (file) {
                skip.append('documents[]', file);
            }
        });
        await skipsService.extendSkip(selectedSkip.id, skip);
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
    <LightInput title="Действует до:" name="new_end_date" type="date" bind:value={endDate} readonly={selectedSkip.status !== Status.APPROVED}/>
    <FilesList files={selectedSkip.files} />
    {#if selectedSkip.status === Status.APPROVED}
        <input type="file" name="documents" multiple>
    {/if}
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