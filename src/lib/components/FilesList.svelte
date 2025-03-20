<script lang="ts">
    let { files=$bindable([]), canRemoeve=() => false, onRemove=null, onAdd=null } = $props();

    let newFiles = $state<any[]>([]);
</script>

<div class="files-list">
    {#each files as file}
        <div class="file {canRemoeve(file) ? '' : 'not-removable'}">
            <a href={"http://romanskm.beget.tech/storage/" + file} download target="_blank" rel="noopener noreferrer">{file}</a>
            {#if canRemoeve(file)}
                <button onclick={() => onRemove(file)}>
                    <img src="/images/trash.svg" alt="Удалить">
                </button>
            {/if}
        </div>
    {/each}
    {#if onAdd}
        <button class="add-btn" onclick={() => onAdd()}>
            Добваить документы
        </button>
    {/if}
</div>

<style>
    .files-list {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin: 5px;
    }

    .file {
        max-width: 300px;
        overflow: hidden;
        display: flex;
        gap: 5px;
        justify-content: space-between;
        align-items: center;
        border: 1px solid black;
        border-radius: 5px;
        padding: 5px;
    }

    a {
        text-decoration: none;
        color: black;
    }

    button {
        background-color: white;
        border: 0px;
    }

    button:hover {
        cursor: pointer;
    }

    img {
        width: 20px;
        height: 20px;
    }

    .add-btn {
        padding: 10px;
        border-radius: 5px;
        color: var(--brand-color);
        border: 1px dotted var(--brand-color);
    }

    .not-removable {
        text-align: center;
        justify-content: center !important;
    }
</style>