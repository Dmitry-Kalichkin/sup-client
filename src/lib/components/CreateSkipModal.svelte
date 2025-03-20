<script lang="ts">
    import { Reason } from "$lib/data/skips/Reason";
    import { skipsService } from "$lib/service/SkipsService";
    import { toServerFormat } from "$lib/utils/DateUtils";
    import FilesList from "./FilesList.svelte";
    import LightInput from "./LightInput.svelte";
    import LightSelect from "./LightSelect.svelte";
    import Modal from "./Modal.svelte";

    let { showModal=$bindable() } = $props();

    async function onsubmit(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement);
        const skip = new FormData();
        skip.set("start_date", toServerFormat(formData.get("start_date") as string ?? ""));
        skip.set("end_date", toServerFormat(formData.get("end_date") as string ?? ""));
        formData.getAll("documents").forEach((file) => {
            if (file) {
                skip.append('documents[]', file);
            }
        });
        await skipsService.createSkip(skip);
    }
</script>

<Modal bind:showModal={showModal} {onsubmit}>
    {#snippet header()}
        <div class="modal-header">
            <h2>
                Создать пропуск
            </h2>
        </div>
    {/snippet}
    <LightSelect label="Причина:" name="reason" optionsEnum={Reason} />
    <LightInput title="Дата начала:" name="start_date" type="date" />
    <LightInput title="Действует до:" name="end_date" type="date" />
    <input type="file" name="documents" multiple>
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