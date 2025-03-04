<script lang="ts">
    let {loadFunction, contentSnippet} = $props();
</script>

<div>
    {#await loadFunction()}
        <div>Загрузка...</div>
    {:then data} 
        {@render contentSnippet(data)}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>