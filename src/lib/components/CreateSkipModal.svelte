<script lang="ts">
    import { Reason } from "$lib/data/skips/Reason";
    import { skipsService } from "$lib/service/SkipsService";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import LightSelect from "./LightSelect.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable() } = $props();

    let reason = $state(Reason.ILL);
    let startDate = $state<string | null>(null);
    let endDate = $state<string | null>(null);
    let files = $state<any[]>([]);

    async function onsubmit(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        await skipsService.createSkip(formData);
    }

    function onClose() {
        reason = Reason.ILL;
        startDate = null;
        endDate = null;
        files = [];
    }
</script>

<Modal bind:showModal={showModal} {onsubmit} {onClose}>
    {#snippet header()}
        <div class="modal-header">
            <h2>
                Создать пропуск
            </h2>
        </div>
    {/snippet}
    <LightSelect label="Причина:" name="reason" optionsEnum={Reason} />
    <LightInput title="Дата начала:" name="start_date" type="date" bind:value={startDate} />
    <LightInput title="Действует до:" name="end_date" type="date" bind:value={endDate} />
    <FilesList files={files} canRemoeve={() => true} onAdd={() => {}} />
</Modal>

<style>
    h2 {
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 20px;
        text-align: center;
    }
    
    .modal-header {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>