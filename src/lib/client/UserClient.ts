import type { CreateUser } from '$lib/data/user/CreateUser';
import type { Credentials } from '$lib/data/user/Credentials';
import { Role } from '$lib/data/user/Role';
import type { UpdateUser } from '$lib/data/user/UpdateUser';
import type { User } from '$lib/data/user/User';
import type { UsersPage, UsersPageParameters } from '$lib/data/user/UsersPage';
import { BaseClient } from './BaseClient';

export class UserClient extends BaseClient {
    public async login(credentials: Credentials): Promise<string> {
        const response = await this.post('login', credentials);
        if (!response.ok) {
            throw new Error('Wrong credentials');
        }
        const res = await response.json();
        return res.token;
    }

    public async getProfile(): Promise<User> {
        const response = await this.get('profile', null);
        if (!response.ok) {
            throw new Error('Unexcepted error');
        }
        return await response.json();
    }

    public async createUser(user: CreateUser): Promise<void> {
        const response = await this.post('register', user);
        if (!response.ok) {
            throw new Error('Unexcepted error');
        }
    }

    public async updateUser(updateUser: UpdateUser): Promise<void> {
        const response = await this.post('roles-change', updateUser);
        if (!response.ok) {
            throw new Error('Unexcepted error');
        }
    }

    public async getUsers(parameters: UsersPageParameters): Promise<UsersPage> {
        const params = {
            page: parameters.page.toString(),
            per_page: parameters.per_page.toString()
        };
        if (parameters.fullName) {
            params['fullName'] = parameters.fullName;
        }
        if (parameters.role) {
            params['role'] = parameters.role;
        }
        const response = await this.get('users', new URLSearchParams(params));
        if (!response.ok) {
            throw new Error('Unexcepted error');
        }
        const page = await response.json();
        return {
            pagination: page.pagination,
            users: page.data.map(user => {
                return {
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    roles: user.roles.map(role => role.name as Role),
                    skips: user.skips_count,
                    group_id: user.group_id
                }
            })
        };
    }
}

export const userClient = new UserClient();