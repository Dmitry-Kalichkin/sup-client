<script lang="ts">
    import { Status, StatusColors } from "$lib/data/skips/Status";
    import { parseFormDate } from "$lib/utils/DateUtils";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable(), selectedSkip } = $props();
</script>

<Modal bind:showModal={showModal} {onsubmit}>
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
    <LightInput title="Действует до:" name="endDate" type="date" value={parseFormDate(selectedSkip.endDate)} readonly/>
    <FilesList files={selectedSkip.files} />
    {#if selectedSkip.status === Status.PENDING}
        <div class="btn-container">
            <button class="approve-btn">Подтвердить</button>
            <button class="reject-btn">Отклонить</button>
        </div>
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

    .btn-container {
        margin-top: 10px;
        display: flex;
        gap: 7px;
        justify-content: center;
    }

    .btn-container > button:hover {
        cursor: pointer;
    }

    .approve-btn {
        border: 0px;
        background-color: green;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }

    .reject-btn {
        border: 0px;
        background-color: red;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
</style>