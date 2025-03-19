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
        await new Promise(res => setTimeout(res, 1000));
        return {
            page: parameters.page,
            totalPages: 5,
            currenctSize: 4,
            users: [
                {id: 1, fullName: "Админ Админович Админов", email: "admin@mail.com", roles: [Role.ADMIN], skips: 200},
                {id: 2, fullName: "Студент Студентович Студентов", email: "student@mail.com", roles: [Role.STUDENT], skips: 0},
                {id: 3, fullName: "Декан Деканович Деканов", email: "deanery@mailc.om", roles: [Role.DEANERY], skips: 47},
                {id: 4, fullName: "Преподаватель Преподавателивич Преподавалов", email: "teacher@mail.com", roles: [Role.TEACHER], skips: 7},
                {id: 5, fullName: "Тест Тестович Тестов", email: "test@mail.com", roles: [Role.ADMIN, Role.TEACHER], skips: 0}
            ]
        };
    }
}

export const userClient = new UserClient();