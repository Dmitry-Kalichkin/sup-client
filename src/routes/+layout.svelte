<script>
    import Header from '$lib/components/Header.svelte';
</script>

<Header />
<main>
    <slot />
</main>

<style>
    main {
        height: calc(100vh - 90px);
    }
</style>