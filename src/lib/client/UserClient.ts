import type { Credentials } from '$lib/data/user/Credentials';
import { Role } from '$lib/data/user/Role';
import type { User } from '$lib/data/user/User';

export class UserClient {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
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
}

export const userClient = new UserClient('http://localhost');

const stubUsers = new Map<string, User>([
    ["admin", { username: 'admin', email: 'admin@mail.com', role: Role.ADMIN }],
    ["deanery", { username: 'deanery', email: 'deanery@mail.com', role: Role.DEANERY }],
    ["student", { username: 'student', email: 'student@mail.com', role: Role.STUDENT }],
    ["teacher", { username: 'teacher', email: 'teacher@mail.com', role: Role.TEACHER }]
]);