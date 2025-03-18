<script lang="ts">
    let {label, name, optionsEnum, width="300px"} = $props();

</script>

<div class="container" style="width: {width}">
    <label for={name}>{label}</label>
    <select id={name} name={name}>
        {#each Object.values(optionsEnum) as opt}
            <option value={opt}>{opt}</option>
        {/each}
    </select>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        padding: 5px;
        align-items: center;
        gap: 10px;
    }

    label {
        width: 100%;
        font-size: 16px;
    }

    select {
        width: 100%;
        padding: 10px;
        padding-right: 25px;
        outline: 0;
        border-radius: 5px;
        border: 1px;
        border-style: solid;
        border-color: gray;
    }
</style>