<script lang="ts">
    import userService from '$lib/service/UserService';
    import type { Credentials } from "$lib/data/user/Credentials";

    let username = $state('');
    let password = $state('');
    let validated = $state(false);
    let isResponseSuccessful = $state(true);

    function onsubmit(e: SubmitEvent) {
        if (isFormInvalid()) {
            return;
        }
        try {
            const creds: Credentials = {username: username, password: password};
            userService.login(creds);
        } catch (e) {
            isResponseSuccessful = false;
        }
    }

    function isFormInvalid(): boolean {
        validated = true;
        return username.trim().length == 0 || password.trim().length < 4;
    }
</script>

<div class="container">
    <h1>
        Войти
    </h1>
    <form {onsubmit} onchange={() => validated = false}>
        <div class="input-block">
            <label for="username">Логин</label>
            <input id="username" type="text" bind:value={username} placeholder="Логин">
            {#if validated && username.trim().length == 0}
                <div class="invalid">
                    Логин не может быть пустым
                </div>
            {/if}
        </div>
        <div class="input-block">
            <label for="password">Пароль</label>
            <input id="password" type="password" bind:value={password} placeholder="Пароль">
            {#if validated && password.trim().length < 4}
                <div class="invalid">
                    Пароль должен быть не менее 4 символов
                </div>
            {/if}
        </div>
        <button type="submit">Войти</button>
        {#if !isResponseSuccessful}
            <div class="invalid server-error-block">
                Неверный логин или пароль
            </div>
        {/if}
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

    .invalid {
        color: red;
        margin-top: 5px;
    }

    .server-error-block {
        text-align: center;
    }

</style>