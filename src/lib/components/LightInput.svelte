<script lang="ts">
    let {name, type="text", value, title, readonly=false, multiple=false, width="300px"} = $props();
</script>

<div class="container" style="width: {width}">
    <label for={name}>{title}</label>
    <input {name} {type} {value} {readonly} class={readonly ? 'inactive' : ''} {multiple}>
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

    input {
        width: 100%;
        padding: 10px;
        outline: 0;
        border-radius: 5px;
        border: 1px;
        border-style: solid;
        border-color: gray;
    }

    .inactive {
        cursor: default;
        color: gray;
    }
</style>