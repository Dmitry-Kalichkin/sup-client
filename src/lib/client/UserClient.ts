import type { Credentials } from '$lib/data/user/Credentials';
import { Role } from '$lib/data/user/Role';
import type { User } from '$lib/data/user/User';
import type { UsersPage, UsersPageParameters } from '$lib/data/user/UsersPage';

export class UserClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public login(credentials: Credentials): string {
        const user: User | undefined = stubUsers.get(credentials.username);
        if (user == null || user.username != credentials.password) {
            throw new Error('Wrong credentials');
        }
        return user.username;
    }

    public getProfile(token: string): User {
        const user: User | undefined = stubUsers.get(token);
        if (user == null) {
            throw new Error('Wrong credentials');
        }
        return user;
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

export const userClient = new UserClient('http://localhost/users');

const stubUsers = new Map<string, User>([
    ["admin", { username: 'admin', email: 'admin@mail.com', role: Role.ADMIN }],
    ["deanery", { username: 'deanery', email: 'deanery@mail.com', role: Role.DEANERY }],
    ["student", { username: 'student', email: 'student@mail.com', role: Role.STUDENT }],
    ["teacher", { username: 'teacher', email: 'teacher@mail.com', role: Role.TEACHER }]
]);