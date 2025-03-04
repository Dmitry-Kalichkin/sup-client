<script lang="ts">
    let {loadFunction, contentSnippet} = $props();
</script>

<div class="container">
    {#await loadFunction()}
        <div class="load-container">
            <div class="loader"></div>
            <div>Загрузка...</div>
        </div>
    {:then data} 
        {@render contentSnippet(data)}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: fit-content;
    }

    .load-container {
        display: flex;
        align-items: center;
    }

    .loader {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--brand-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 2s linear infinite;
        margin: 10px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>