import type { Credentials } from '$lib/data/user/Credentials';
import { Role } from '$lib/data/user/Role';
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

    public async getUsers(parameters: UsersPageParameters): Promise<UsersPage> {
        const response = await this.get('users', null);
        if (!response.ok) {
            throw new Error('Unexcepted error');
        }
        const page = await response.json();
        return {
            page: page.page,
            totalPages: page.totalPages,
            currenctSize: page.currenctSize,
            users: page.data.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    roles: user.roles.map(role => role.name as Role),
                    skips: user.skips.length
                }
            })
        };
    }
}

export const userClient = new UserClient();