<script lang="ts">
    import { StatusColors } from "$lib/data/skips/Status";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable(), selectedSkip } = $props();

    let endDate = $state(new Date());
    let files = $state<any[]>([]);
</script>

<Modal bind:showModal={showModal}>
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
    <form>
        <LightInput title="Причина:" name="reason" value={selectedSkip?.reason} readonly />
        <LightInput title="Дата начала:" name="startDate" type="date" value={selectedSkip?.startDate} readonly />
        <LightInput title="Действует до:" name="endDate" type="date" value={selectedSkip?.endDate} />
        <FilesList files={selectedSkip?.files} onAdd={() => {}} />
    </form>
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