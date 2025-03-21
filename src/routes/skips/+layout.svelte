<script lang="ts">
    import Input from "$lib/components/Input.svelte";
    import Select from "$lib/components/Select.svelte";
    import { Reason } from "$lib/data/skips/Reason";
    import { Status } from "$lib/data/skips/Status";
    import { page } from '$app/stores';
    import { skipsService } from "$lib/service/SkipsService";
    import type { Group } from "$lib/data/Group";
    import { groupService } from "$lib/service/GroupService";

    let searchParams = $state<URLSearchParams>(new URLSearchParams(window.location.search));
    let fullName = $state(searchParams.get("fullName") || null);
    let group = $state(searchParams.get("group") != null ? parseInt(searchParams.get("group") as string) : null);
    let status = $state(searchParams.get("status") ? (searchParams.get("status") as Status) : null);
    let reason = $state(searchParams.get("reason") ? (searchParams.get("reason") as Reason) : null);
    let startDate = $state(searchParams.get("startDate") || null);
    let endDate = $state(searchParams.get("endDate") || null);
    let pageNumber = $state<number>(searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1);
    
    function onsubmit(e: SubmitEvent) {
        console.log(fullName, group, status, reason, startDate, endDate);
        if (fullName) {
            searchParams.set("fullName", fullName);
        } else {
            searchParams.delete("fullName");
        }
        if (group) {
            searchParams.set("group", group.toString());
        } else {
            searchParams.delete("group");
        }
        if (status) {
            searchParams.set("status", status);
        } else {
            searchParams.delete("status");
        }
        if (reason) {
            searchParams.set("reason", reason);
        } else {
            searchParams.delete("reason");
        }
        if (startDate) {
            searchParams.set("startDate", startDate);
        } else {
            searchParams.delete("startDate");
        }
        if (endDate) {
            searchParams.set("endDate", endDate);
        } else {
            searchParams.delete("endDate");
        }
        searchParams.set("page", pageNumber.toString());
        window.location.search = searchParams.toString();
    }

    function isStudentNotSelected(): boolean {
        return $page.url.pathname !== '/skips/my';
    }

    async function exportSkips(e: MouseEvent) {
        const url = await skipsService.exportSkips({});
        window.open("http://romanskm.beget.tech/" + url);
    }

    async function loadGroups(): Promise<Group[]> {
        return await groupService.getGroups();
    }

    function getGroupView(groups: Group[]): Map<Group, string> {
        const map = new Map();
        for (const group of groups) {
            map.set(group, group.group_number);
        }
        return map;
    }
</script>

<div class="container">
    <form class="search-box" {onsubmit}>
        <h1>Фильтры</h1>
        {#if isStudentNotSelected()}
            <Input label="ФИО пользователя" name="fullName" type="text" width="290px" bind:value={fullName} />
            {#await loadGroups()}
                ...
            {:then groups} 
                <Select label="Группа" name="group" optionsEnum={groups} getValue={group => group.id} translations={getGroupView(groups)} width="315px" bind:value={group} />
            {/await}
        {/if}
        <div class="group-filters">
            <Select label="Статус" name="status" optionsEnum={Status} width="150px" bind:value={status} />
            <Select label="Причина" name="reason" optionsEnum={Reason} width="150px" bind:value={reason} />
        </div>
        <div class="group-filters">
            <Input label="Пропуск с" name="startDate" type="date" width="125px" bind:value={startDate} />
            <Input label="Пропуск до" name="endDate" type="date" width="125px" bind:value={endDate} />
        </div>
        <button type="submit">Найти</button>
        {#if isStudentNotSelected()}
            <button type="button" onclick={exportSkips}>Экспортировать</button>
        {/if}
        <input type="hidden" name="page" bind:value={pageNumber} />
    </form>
    <div class="skips-list">
        {#key searchParams}
            <slot />
        {/key}
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
        height: fit-content;
        min-height: calc(100% - 15px);
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
        border-left: black 1px solid;
    }
</style>