<script lang="ts">
    let {label, name, type, width, inline = false, value=$bindable(), required=false} = $props();

</script>

<div class="input-block {inline ? 'inline' : ''}">
    <label for={name}>{label}</label>
    <input id={name} name={name} bind:value={value} style="width: {width}" type={type} placeholder="" {required}>
</div>

<style>
    .input-block {
        display: flex;
        flex-direction: column;
        margin: 5px;
    }

    input {
        padding: 10px;
        border-color: black;
        border-radius: 5px;
        width: 290px;
    }

    input:focus {
        outline-color: var(--brand-color);
        border-color: var(--brand-color);
    }

    label {
        margin-left: 5px;
        margin-bottom: 5px;
    }

    .inline {
        flex-direction: row !important;
        align-items: center;
        gap: 5px;
        justify-content: center;
    }
</style>