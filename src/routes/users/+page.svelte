<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import { Role, translations } from "$lib/data/user/Role";
    import type { UsersPageEntry, UsersPage } from "$lib/data/user/UsersPage";
    import userService from "$lib/service/UserService";
    import { writable } from "svelte/store";

    let fullName: string | null = $state(null);
    let roles: Role[] | null = $state(null);
    let pageNumber = writable<number>(1);
    let totalPages: number = $state(1);

    async function loadUsers(): Promise<UsersPageEntry[]> {
        const usersPage: UsersPage = await userService.getUsers({fullName: fullName, roles: roles, page: $pageNumber});
        $pageNumber = usersPage.page;
        totalPages = usersPage.totalPages;
        return usersPage.users;
    }
</script>

<div class="container">
    <div>
        <h1>Пользователи</h1>
        <div class="search-box">
            <div class="input-block">
                <label for="fullName">ФИО пользователя</label>
                <input id="fullName" type="text" bind:value={fullName} placeholder="ФИО">
            </div>
            <div class="input-block">
                <label for="role">Роли</label>
                <select id="role" bind:value={roles} placeholder="Роль" multiple>
                    <option value={null}>Все роли</option>
                    {#each Object.values(Role) as role}
                        <option value={role}>{translations.get(role)}</option>
                    {/each}
                </select>
            </div>
            <div class="buttons-group">
                <button>Найти</button>
                {#if userService.isManager()}
                    <button>
                        <img src="/images/plus-icon.svg" alt="Добавить пользователя" />
                    </button>
                    <button>
                        <img src="/images/csv-icon.svg" alt="Добавить пользователей" />
                    </button>    
                {/if}
            </div>
        </div>
    </div>
    <Page loadFunction={loadUsers} content={usersTable} currentPage={pageNumber} totalPages={totalPages}/>
</div>

{#snippet usersTable(users: UsersPageEntry[])}
    <div class="users-container">
        {#each users as user}
            <div class="user">
                <div>
                    <div class="user-name">{user.fullName}</div>
                    <div class="user-email">{user.email}</div>
                    <div class="user-roles">{user.roles.map(role => translations.get(role)).join(', ')}</div>
                </div>
                <div class="skips">
                    Пропуски: {user.skips}
                </div>
            </div>
        {/each}
    </div>
{/snippet}

<style>
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    h1 {
        font-size: 32px;
        margin-top: 10px;
        margin-bottom: 20px;
        text-align: center;
    }

    input {
        padding: 10px;
        border-color: black;
        width: 300px;
        border-radius: 5px;
    }

    select {
        padding: 10px;
        border-color: black;
        width: 170px;
        height: 40px;
        border-radius: 5px;
    }

    .input-block {
        display: flex;
        flex-direction: column;
        margin: 5px;
    }

    input:focus {
        outline-color: var(--brand-color);
        border-color: var(--brand-color);
    }

    label {
        margin-bottom: 5px;
    }
    
    .search-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 20px;
    }

    .users-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 20px;
    }

    .user {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin: 10px;
        font-size: 20px;
        padding: 15px;
        cursor: pointer;
    }

    .user:hover {
        background-color: var(--brand-color);
        color: white;
        transition: all 0.2s ease-in-out;
    }

    .user-name {
        font-weight: bold;
        margin-bottom: 5px;
    }

    .user-email {
        opacity: 0.5;
        font-size: 16px;
    }

    .user-roles {
        font-size: 16px;
    }

    .skips {
        font-size: 17px;
    }

    .buttons-group {
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
        margin-bottom: 5px;
    }

    img {
        height: 16px;
        width: 16px;
    }
</style>