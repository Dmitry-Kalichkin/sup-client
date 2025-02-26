import { AuthContext, authContext } from '$lib/context/AuthContext';
import type { Role } from '$lib/data/Role';
import type { Credentials } from '$lib/data/Credentials';

class UserService {
    private readonly authContext: AuthContext;
    private readonly url: string;

    constructor(authContext: AuthContext, url: string) {
        this.authContext = authContext;
        this.url = url;
    }

    public isAuthorized(): boolean {
        return authContext.getToken() !== null;
    }

    public getRole(): Role | null {
        return authContext.getRole();
    }

    public login(credentials: Credentials) {
        console.log(credentials);
    }
}

export default new UserService(authContext, '');