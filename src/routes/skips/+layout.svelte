<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Select from "$lib/components/Select.svelte";
    import { Reason } from "$lib/data/skips/Reason";
    import { Status } from "$lib/data/skips/Status";
    import { page } from '$app/stores';

    function isFullNameUnknown(): boolean {
        return $page.url.pathname !== '/skips/my';
    }
</script>

<div class="container">
    <form class="search-box">
        <h1>Фильтры</h1>
        {#if isFullNameUnknown()}
            <Input label="ФИО пользователя" name="fullName" type="text" width="290px" />
        {/if}
        <div class="group-filters">
            <Select label="Статус" name="status" optionsEnum={Status} width="150px" />
            <Select label="Причина" name="reason" optionsEnum={Reason} width="150px" />
        </div>
        <div class="group-filters">
            <Input label="Пропуск с" name="startTime" type="date" width="125px" />
            <Input label="Пропуск до" name="endTime" type="date" width="125px" />
        </div>
        <button type="submit">Найти</button>
    </form>
    <div class="skips-list">
        <slot />
    </div>
</div>

<style>
    .container {
        display: flex;
        height: 100%;
    }

    h1 {
        font-size: 24px;
        margin: 5px;        
        margin-top: 10px;
        text-align: center;
    }

    .search-box {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-right: black 1px solid;
    }

    .group-filters {
        display: flex;
        gap: 5px;
    }

    button {
        padding: 10px;
        border: 0px;
        border-radius: 5px;
        border-color: var(--brand-color);
        background-color: var(--brand-color);
        color: #ffffff;
        cursor: pointer;
        margin: 5px;
    }

    .skips-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
    }
</style>