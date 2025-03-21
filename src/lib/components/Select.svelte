<script lang="ts">
    let {label, name, optionsEnum, translations=null, width, value=$bindable(), getValue=null} = $props();

</script>

<div class="input-block">
    <label for={name}>{label}</label>
    <select id={name} name={name} bind:value={value} style="width: {width}">
        <option value={null}>Все</option>
        {#each Object.values(optionsEnum) as opt}
            <option value={getValue != null ? getValue(opt) : opt}>{translations != null ? translations.get(opt) : opt}</option>
        {/each}
    </select>
</div>

<style>
    .input-block {
        display: flex;
        flex-direction: column;
        padding: 5px;
    }

    select {
        padding: 10px;
        border-radius: 5px;
        width: 290px;
        border: black 2px solid;
    }

    select:focus {
        outline-color: var(--brand-color);
        border-color: var(--brand-color);
    }

    label {
        margin-left: 5px;
        margin-bottom: 5px;
    }
</style>