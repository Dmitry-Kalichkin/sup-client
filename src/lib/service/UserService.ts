import { AuthContext, authContext } from '$lib/context/AuthContext';
import { UserClient, userClient } from '$lib/client/UserClient';
import type { Role } from '$lib/data/user/Role';
import type { Credentials } from '$lib/data/user/Credentials';
import type { User } from '$lib/data/user/User';

class UserService {
    private readonly authContext: AuthContext;
    private readonly userClient: UserClient;

    constructor(authContext: AuthContext, userClient: UserClient) {
        this.authContext = authContext;
        this.userClient = userClient;
    }

    public isAuthorized(): boolean {
        return this.authContext.getToken() !== null;
    }

    public getRole(): Role | null {
        return this.authContext.getRole();
    }

    public getUsername(): string | null {
        return this.authContext.getUsername();
    }

    public login(credentials: Credentials) {
        const token: string = this.userClient.login(credentials);
        const user: User = this.userClient.getProfile(token);
        this.authContext.setToken(token);
        this.authContext.setUsername(user.username);
        this.authContext.setRole(user.role);
    }

    public logout() {
        this.authContext.removeToken();
        this.authContext.removeUsername();
        this.authContext.removeRole();
    }
}

export default new UserService(authContext, userClient);