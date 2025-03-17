<script lang="ts">
    let { files, onRemove, onAdd } = $props();

</script>

<div class="files-list">
    {#each files as file}
        <div class="file">
            <a href={file} download>{file}</a>
            <button onclick={() => onRemove(file)}>
                <img src="/images/trash.svg" alt="Удалить">
            </button>
        </div>
    {/each}
    <button class="add-btn" onclick={() => onAdd()}>
        Добваить документы
    </button>
</div>

<style>
    .files-list {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin: 5px;
    }

    .file {
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
</style>