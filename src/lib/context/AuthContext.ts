import { Role } from "$lib/data/user/Role";

export class AuthContext {
    private static readonly TOKEN_KEY = "token";
    private static readonly USERNAME_KEY = "username";
    private static readonly EMAIL_KEY = "email";
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

    public getEmail(): string | null {
        return this.localStorage.getItem(AuthContext.EMAIL_KEY);
    }

    public setEmail(email: string) {
        this.localStorage.setItem(AuthContext.EMAIL_KEY, email);
    }

    public removeUsername() {
        this.localStorage.removeItem(AuthContext.USERNAME_KEY);
    }

    public getRoles(): Role[] | null {
        const role = this.localStorage.getItem(AuthContext.ROLE_KEY);
        if (role == null) {
            return null;
        }
        return role.split(",").map(r => r as Role);
    }

    public setRoles(roles: Role[]) {
        this.localStorage.setItem(AuthContext.ROLE_KEY, roles.join(","));
    }

    public removeRoles() {
        this.localStorage.removeItem(AuthContext.ROLE_KEY);
    }
}

export const authContext = new AuthContext(localStorage);