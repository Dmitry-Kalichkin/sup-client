import { Role } from "$lib/data/user/Role";

export class AuthContext {
    private static readonly TOKEN_KEY = "token";
    private static readonly USERNAME_KEY = "username";
    private static readonly ROLE_KEY = "role";
    private readonly localStorage: Storage;

    constructor(localStorage: Storage) {
        this.localStorage = localStorage;
    }

    public getToken(): string | null {
        return this.localStorage.getItem(AuthContext.TOKEN_KEY);
    }

    public setToken(token: string) {
        this.localStorage.setItem(AuthContext.TOKEN_KEY, token);
    }

    public removeToken() {
        this.localStorage.removeItem(AuthContext.TOKEN_KEY);
    }

    public getUsername(): string | null {
        return this.localStorage.getItem(AuthContext.USERNAME_KEY);
    }

    public setUsername(username: string) {
        this.localStorage.setItem(AuthContext.USERNAME_KEY, username);
    }

    public removeUsername() {
        this.localStorage.removeItem(AuthContext.USERNAME_KEY);
    }

    public getRole(): Role | null {
        const role = this.localStorage.getItem(AuthContext.ROLE_KEY);
        return role != null ? Role[role as keyof typeof Role] : null;
    }

    public setRole(role: Role) {
        this.localStorage.setItem(AuthContext.ROLE_KEY, role);
    }

    public removeRole() {
        this.localStorage.removeItem(AuthContext.ROLE_KEY);
    }
}

export const authContext = new AuthContext(localStorage);