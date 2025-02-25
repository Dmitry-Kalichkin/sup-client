import { AuthContext, authContext } from '$lib/context/AuthContext';
import { Role } from '$lib/data/Role';

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
}

export default new UserService(authContext, '');