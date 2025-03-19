<script lang="ts">
    import userService from "$lib/service/UserService";
    import Input from "./Input.svelte";
    import Modal from "./Modal.svelte";
    let { showModal = $bindable() } = $props();

    let name = $state<string>("");
    let email = $state<string>("");
    let password = $state<string>("");

    async function onsubmit(e: SubmitEvent) {
        e.preventDefault();
        console.log(name, email, password);
        await userService.createUser({name: name, email: email, password: password});
    }
</script>

<Modal bind:showModal={showModal} {onsubmit}>
    {#snippet header()}
        <h2>
            Создать пользователя
        </h2>
    {/snippet}

    <Input label="ФИО" name="name" bind:value={name} type="text" width="250px" required/>
    <Input label="Email" name="email" bind:value={email} type="email" width="250px" required/>
    <Input label="Пароль" name="password" bind:value={password} type="password" width="250px" required/>
</Modal>

<style>
    h2 {
        font-size: 20px;
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: center;
    }
</style>