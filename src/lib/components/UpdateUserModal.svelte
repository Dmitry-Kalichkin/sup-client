<script lang="ts">
    import { Role, translations } from "$lib/data/user/Role";
    import userService from "$lib/service/UserService";
    import Input from "./Input.svelte";
    import Modal from "./Modal.svelte";

    let { showModal = $bindable(), editUser } = $props();

    function changeRoles(e: MouseEvent, role: Role) {
        e.preventDefault();
        if (editUser.roles.length > 1 && editUser.roles.includes(role)) {
            editUser.roles = editUser.roles.filter(r => r !== role);
        } else if (!editUser?.roles.includes(role)) {
            editUser.roles = [...editUser.roles, role];
        }
    }

    function onsubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log(editUser);
    }
</script>

<Modal bind:showModal={showModal} {onsubmit}>
    {#snippet header()}
        <h2>
            {editUser?.name}
        </h2>
        <div class="title-email">{editUser?.email}</div>
    {/snippet}
    <div class="roles-container">
        {#if userService.hasRole(Role.ADMIN)}
            <button class="{editUser?.roles.includes(Role.DEANERY) ? '' : 'disabled'}" onclick={(e) => changeRoles(e, Role.DEANERY)}>{translations.get(Role.DEANERY)}</button>
        {/if}
        <button class="{editUser?.roles.includes(Role.TEACHER) ? '' : 'disabled'}" onclick={(e) => changeRoles(e, Role.TEACHER)}>{translations.get(Role.TEACHER)}</button>
        <button class="{editUser?.roles.includes(Role.STUDENT) ? '' : 'disabled'}" onclick={(e) => changeRoles(e, Role.STUDENT)}>{translations.get(Role.STUDENT)}</button>
    </div>
    {#if editUser?.roles.includes(Role.STUDENT)}
        <Input inline label="Группа:" name="group" bind:value={editUser.group} type="text" width="250px" />
    {/if}
</Modal>

<style>
    .roles-container {
        display: flex;
        justify-content: center;
        gap: 5px;
        flex-wrap: wrap;
    }

    .title-email {
        opacity: 0.5;
        font-size: 18px;
        text-align: center;
        margin-bottom: 10px;
    }

    .disabled {
        background-color: #ffffff;
        color: black;
    }

    h2 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: center;
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
</style>