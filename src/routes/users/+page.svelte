<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import { Role, translations } from "$lib/data/user/Role";
    import type { UsersPageEntry, UsersPage } from "$lib/data/user/UsersPage";
    import userService from "$lib/service/UserService";
    import Modal from "$lib/components/Modal.svelte";
    import CreateUserModal from "$lib/components/CreateUserModal.svelte";
    import UpdateUserModal from "$lib/components/UpdateUserModal.svelte";
    import Input from "$lib/components/Input.svelte";
    import Select from "$lib/components/Select.svelte";

    let showCreateUserModal = $state(false);
    let showCreateUsersBatchModal = $state(false);
    let showEditUserModal = $state(false);

    let searchParams = $state<URLSearchParams>(new URLSearchParams(window.location.search));

    let fullName = searchParams.get("fullName") || null;
    let role = searchParams.get("role") ? (searchParams.get("role") as Role) : null;
    let pageNumber = $state<number>(searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1);
    let totalPages = $state(1);

    let editUser = $state<UsersPageEntry | null>(null);
    
    async function loadUsers(): Promise<UsersPageEntry[]> {
        const usersPage: UsersPage = await userService.getUsers({fullName: fullName, role: role, page: pageNumber, per_page: 5});
        pageNumber = usersPage.pagination.current_page;
        totalPages = usersPage.pagination.last_page;
        return usersPage.users;
    }

    function onUserClick(user: UsersPageEntry) {
        showEditUserModal = true;
        editUser = user;
    }

    function onsubmit(e: SubmitEvent) {
        const formData = new FormData(e.target as HTMLFormElement)
        fullName = formData.get("fullName") as string;
        role = formData.get("role") as Role;
        pageNumber = formData.get("pageNumber") ? parseInt(formData.get("pageNumber") as string) : 1;
        const newParams = new URLSearchParams();
        newParams.set("fullName", fullName);
        newParams.set("role", role);
        newParams.set("page", pageNumber.toString());
        searchParams = newParams;
    }
</script>

<div class="container">
    <div>
        <h1>Пользователи</h1>
        <form class="search-box" {onsubmit}>
            <Input label="ФИО пользователя" name="fullName" type="text" width="270px" value={fullName} />
            <Select label="Роль" name="role" optionsEnum={Role} {translations} width="150px" value={role} />
            <input name="pageNumber" bind:value={pageNumber} hidden>
            <div class="buttons-group">
                <button type="submit">Найти</button>
                <button type="button" onclick={() => (showCreateUserModal = true)}>
                    <img src="/images/plus-icon.svg" alt="Добавить пользователя" />
                </button>
                <button type="button" onclick={() => (showCreateUsersBatchModal = true)}>
                    <img src="/images/csv-icon.svg" alt="Добавить пользователей" />
                </button>    
            </div>
        </form>
    </div>
    {#key searchParams}
        <Page loadFunction={loadUsers} content={usersList} bind:currentPage={pageNumber} bind:totalPages={totalPages}/>        
    {/key}
</div>

<CreateUserModal bind:showModal={showCreateUserModal} />
{#if showEditUserModal}
    <UpdateUserModal bind:showModal={showEditUserModal} {editUser} />
{/if}

<Modal bind:showModal={showCreateUsersBatchModal}>
    {#snippet header()}
        <h2>
            Создать пользователей
        </h2>
    {/snippet}
    <label for="myfile" class="label">Выберите файлы</label>
    <input type="file" class="my" id="myfile" name="myfile" multiple>
</Modal>

{#snippet usersList(users: UsersPageEntry[])}
    <div class="users-container">
        {#each users as user}
            <div class="user" onclick={() => onUserClick(user)}>
                <div>
                    <div class="user-name">{user.name}</div>
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

    h2 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: center;
    }

    input {
        padding: 10px;
        border-color: black;
        width: 300px;
        border-radius: 5px;
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