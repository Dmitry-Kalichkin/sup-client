<script lang="ts">
    import userService from '$lib/service/UserService';
    import type { Credentials } from "$lib/data/user/Credentials";

    let username = $state('');
    let password = $state('');

    function onsubmit(e: SubmitEvent) {
        if (isFormInvalid()) {
            return;
        }
        const creds: Credentials = {username: username, password: password};
        userService.login(creds);
    }

    function isFormInvalid(): boolean {
        return false;
    }
</script>

<div class="container">
    <h1>
        Войти
    </h1>
    <form {onsubmit}>
        <div class="input-block">
            <label for="username">Логин</label>
            <input id="username" type="text" bind:value={username} placeholder="Логин">
        </div>
        <div class="input-block">
            <label for="password">Пароль</label>
            <input id="password" type="password" bind:value={password} placeholder="Пароль">
        </div>
        <button type="submit">Войти</button>
    </form>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }

    h1 {
        font-size: 32px;
        margin-top: 50px;
        margin-bottom: 30px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input {
        padding: 10px;
        border-color: black;
        width: 300px;
    }

    input:focus {
        outline-color: var(--brand-color);
        border-color: var(--brand-color);
    }

    label {
        margin-bottom: 5px;
    }

    .input-block {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    button {
        padding: 10px;
        border: 0px;
        border-color: var(--brand-color);
        background-color: var(--brand-color);
        color: white;
        cursor: pointer;
    }
</style>