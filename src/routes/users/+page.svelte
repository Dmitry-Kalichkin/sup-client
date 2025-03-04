<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import { Role } from "$lib/data/user/Role";
    import type { UsersPageEntry, UsersPage } from "$lib/data/user/UsersPage";
    import userService from "$lib/service/UserService";

    let fullName: string | null = $state(null);
    let roles: Role[] | null = $state(null);
    let pageNumber: number = $state(1);
    let totalPages: number = $state(1);

    async function loadUsers(): Promise<UsersPageEntry[]> {
        const usersPage: UsersPage = await userService.getUsers({fullName: fullName, roles: roles, page: pageNumber});
        pageNumber = usersPage.page;
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
                    <option value={Role.ADMIN}>Администратор</option>
                    <option value={Role.DEANERY}>Деканат</option>
                    <option value={Role.STUDENT}>Студент</option>
                    <option value={Role.TEACHER}>Преподаватель</option>
                </select>
            </div>
        </div>
    </div>
    <Page loadFunction={loadUsers} contentSnippet={usersTable} currentPage={pageNumber} totalPages={totalPages}/>
</div>

{#snippet usersTable(users: UsersPageEntry[])}
    <div class="users-container">
        <div class="user">
            <div class="user-name">ФИО</div>
            <div class="user-email">Почта</div>
            <div class="user-roles">Роли</div>
        </div>
        {#each users as user}
            <div class="user">
                <div class="user-name">{user.fullName}</div>
                <div class="user-email">{user.email}</div>
                <div class="user-roles">{user.roles.join(', ')}</div>
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
        margin-top: 30px;
        margin-bottom: 20px;
        text-align: center;
    }

    input {
        padding: 10px;
        border-color: black;
        width: 300px;
    }

    select {
        padding: 10px;
        border-color: black;
        width: 170px;
        height: 40px;
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
        align-items: center;
        margin-bottom: 20px;
    }

    .users-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .user {
        display: flex;
        padding: 10px;
    }

    .user-name {
        width: 300px;
    }

    .user-email {
        width: 150px;
    }

    .user-roles {
        width: 100px;
    }

    .user:hover {
        cursor: pointer;
        background-color: var(--brand-color);
        color: white;
    }
</style>