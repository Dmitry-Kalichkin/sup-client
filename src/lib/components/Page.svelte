<script lang="ts">
    let {loadFunction, content, currentPage, totalPages} = $props();
    
    function getPageNumbers(): number[] {
        return [...Array(totalPages).keys()].map(n => n + 1);
    }
</script>

<div class="container">
    {#await loadFunction()}
        <div class="load-container">
            <div class="loader"></div>
            <div>Загрузка...</div>
        </div>
    {:then data} 
        {@render content(data)}
        <ul class="page-numbers">
            {#each getPageNumbers() as pageNumber}
                <li>
                    <button class="page-btn {$currentPage === pageNumber ? 'active-page' : ''}" onclick={() => $currentPage = pageNumber}>
                        {pageNumber}
                    </button>
                </li>
            {/each}
        </ul>
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

    .page-numbers {
        display: flex;
        justify-content: center;
        list-style: none;
    }

    .page-btn {
        border: none;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        margin: 5px;
        min-width: 30px;
        min-height: 30px;
    }

    .active-page {
        background-color: var(--brand-color);
        color:white;
    }
</style>