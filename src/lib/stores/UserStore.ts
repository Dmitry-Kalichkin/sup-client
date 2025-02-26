import { writable } from 'svelte/store';
import { Role } from '$lib/data/user/Role';
import userService from '$lib/service/UserService';

export const authorized = writable<boolean>(userService.isAuthorized());
export const role = writable<Role | null>(userService.getRole());