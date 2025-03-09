<script lang="ts">
    import userService from '$lib/service/UserService';
</script>

<header>
    <nav>
        <a href="/">
            <img src="/images/logo.svg" alt="logo" class="logo"/>
            <p class="title">
                Система
                Учета
                Пропусков
            </p>
        </a>
        {#if userService.isManager()}
            <a href="/skips">Пропуски</a>
        {/if}
        {#if userService.isAuthorized()}
            <a href="/skips/my">Мои пропуски</a>
        {/if}
        {#if userService.isManager()}
            <a href="/users">Пользователи</a>
        {/if}
    </nav>
    <nav>
        {#if userService.isAuthorized()}
            <a href="/profile">{userService.getUsername()}</a>
            <a href="#" onclick={() => userService.logout()}>Выйти</a>
        {:else}
            <a href="/login">Вход</a>
        {/if}
    </nav>
</header>

<style>
    header {
        padding: 10px;
        display: flex;
        justify-content: space-between;
    }

    nav {
        display: flex;
    }

    a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: black;
        margin: 10px;
    }

    .logo {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }

    .title {
        font-size: 14px;
        font-weight: bold;
        display: flex;
        width: 90px;
    }
</style>