<script lang="ts">
    import { Reason } from "$lib/data/skips/Reason";
    import { Status } from "$lib/data/skips/Status";

    let fullName: string | null = null;
    let status: Status | null = null;
    let reason: Reason | null = null;
    let startTime: Date | null = null;
    let endTime: Date | null = null;

    function applyFilters() {
        console.log(fullName, status, reason, startTime, endTime);
    }
</script>

<div class="container">
    <div class="search-box">
        <h2>Фильтры</h2>
        <div class="input-block">
            <label for="fullName">ФИО пользователя</label>
            <input id="fullName" type="text" bind:value={fullName} placeholder="ФИО">
        </div>
        <div class="group-filters">
            <div class="input-block">
                <label for="status">Статус</label>
                <select id="status" bind:value={status} placeholder="Статус" class="select-grouped">
                    <option value={null}>Не выбран</option>
                    {#each Object.values(Status) as status}
                        <option value={status}>{status}</option>
                    {/each}
                </select>
            </div>
            <div class="input-block">
                <label for="reason">Причина</label>
                <select id="reason" bind:value={reason} placeholder="Причина" class="select-grouped">
                    <option value={null}>Не выбрана</option>
                    {#each Object.values(Reason) as reason}
                        <option value={reason}>{reason}</option>
                    {/each}
                </select>
            </div>
        </div>
        <div class="group-filters">
            <div class="input-block">
                <label for="startTime">Пропуск с</label>
                <input id="startTime" class="input-date" type="date" bind:value={startTime} placeholder="">
            </div>
            <div class="input-block">
                <label for="startTime">Пропуск до</label>
                <input id="startTime" class="input-date" type="date" bind:value={endTime} placeholder="">
            </div>
        </div>
        <button onclick={applyFilters}>Найти</button>
    </div>
    <div class="skips-list">
        <h1>Мои пропуски</h1>
    </div>
</div>

<style>
    .container {
        display: flex;
        height: 100%;
    }

    h1 {
        font-size: 32px;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    h2 {
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

    input, select {
        padding: 10px;
        border-color: black;
        border-radius: 5px;
        width: 290px;
    }

    .input-block {
        display: flex;
        flex-direction: column;
        margin: 5px;
    }

    .input-date {
        width: 125px;
    }

    .select-grouped {
        width: 150px;
        border: black 2px solid;
    }

    input:focus {
        outline-color: var(--brand-color);
        border-color: var(--brand-color);
    }

    label {
        margin-bottom: 5px;
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