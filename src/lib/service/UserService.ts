import { AuthContext, authContext } from '$lib/context/AuthContext';
import { UserClient, userClient } from '$lib/client/UserClient';
import { Role } from '$lib/data/user/Role';
import type { Credentials } from '$lib/data/user/Credentials';
import type { User } from '$lib/data/user/User';
import type { UsersPage, UsersPageParameters } from '$lib/data/user/UsersPage';
import type { CreateUser } from '$lib/data/user/CreateUser';
import type { UpdateUser } from '$lib/data/user/UpdateUser';
import { groupService, GroupService } from './GroupService';

class UserService {
    private readonly authContext: AuthContext;
    private readonly userClient: UserClient;
    private readonly groupService: GroupService;

    constructor(authContext: AuthContext, userClient: UserClient, groupService: GroupService) {
        this.authContext = authContext;
        this.userClient = userClient;
        this.groupService = groupService;
    }

    public isManager(): boolean {
        return this.isAuthorized() && (this.hasRole(Role.ADMIN) || this.hasRole(Role.DEANERY));
    }

    public isAuthorized(): boolean {
        return this.authContext.getToken() !== null;
    }

    public hasRole(role: Role): boolean {
        return this.authContext.getRoles()?.includes(role) ?? false;
    }

    public getUsername(): string | null {
        return this.authContext.getUsername();
    }

    public async login(credentials: Credentials) {
        const token: string = await this.userClient.login(credentials);
        this.authContext.setToken(token);
        const user: User = await this.userClient.getProfile();
        this.authContext.setUsername(user.fullName);
        this.authContext.setEmail(user.email);
        this.authContext.setRoles(user.roles);
        const redirect = this.isManager() ? "/skips" : "/skips/my";
        window.location.href = redirect;
    }

    public logout() {
        this.authContext.removeToken();
        this.authContext.removeUsername();
        this.authContext.removeRoles();
        window.location.assign("/login");
    }

    public async createUser(user: CreateUser): Promise<void> {
        await this.userClient.createUser(user);
    }

    public async updateUser(updateUser: UpdateUser): Promise<void> {
        await this.userClient.updateUser(updateUser);
    }

    public async getUsers(parameters: UsersPageParameters): Promise<UsersPage> {
        const page = await this.userClient.getUsers(parameters);
        const groups = await this.groupService.getGroups();
        return {
            pagination: page.pagination,
            users: page.users.map(user => {
                user.group_id = groups.filter(group => user.group_id == group.id)[0]?.group_number;
                return user;
            })
        }
    }
}

export default new UserService(authContext, userClient, groupService);