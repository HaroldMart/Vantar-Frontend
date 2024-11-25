'use server'

import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { API_URL } from "@shared/constants";
import { LoginCredentials, Tokens, ResetPassword, SingupCredentials } from '@auth/lib/interfaces';

const url: string = API_URL + 'auth';

export async function login(credentials: LoginCredentials) {
    try {
        const res = await axios.post<Tokens>(url + '/login', credentials);
        cookies().set('access_token', res.data.access_token);
        cookies().set('refresh_token', res.data.refresh_token);
        return { success: true }
    } catch (err: any) {
        return {
            message: err.response.data.message,
            status: err.response.data.statusCode
        }
    }
}

export async function singUp(credentials: SingupCredentials) {
    try {
        await axios.post<string>(API_URL + 'users', credentials);
        return login(credentials);
    } catch (err: any) {
        return {
            message: err.response.data.message,
            status: err.response.data.statusCode
        }
    }
}

export async function refresh(): Promise<void> {
    const token: string = cookies().get('refresh-token')?.value ?? '';

    if (!token) permanentRedirect('/login');

    try {
        const res = await axios.post<Tokens>(url + '/refresh', token, {
            headers: { 'token': token }
        });
        const { access_token, refresh_token } = res.data;

        cookies().set('acces_token', access_token);
        cookies().set('refresh_token', refresh_token);
    } catch (err) {
        console.error('Error refreshing tokens:', err);
        throw new Error('Failed to refresh. Please check your credentials.');
    }
}

export async function logout(): Promise<void> {
    const token: string = cookies().get('refresh-token')?.value ?? '';

    try {
        await axios.get<string>(url + '/logout', {
            headers: { 'token': token }
        });
        cookies().delete('access_token');
        cookies().delete('refresh_token');
    } catch (err) {
        console.error('Error loging out:', err);
        throw new Error('Failed to log out. Please check your credentials.');
    }
}

export async function forgotPassword(email: string) {
    try {
        const res = await axios.post<{ message: string }>(url + '/forgot', email);
        return res.data;
    } catch (err: any) {
        return {
            message: err.response.data.message,
            status: err.response.data.statusCode
        }
    }
}

export async function activateAccount(token: string) {
    try {
        const res = await axios.get<{ message: string }>(url + '/activate', {
            params: { 'token': token }
        });
        return { success: true };
    } catch (err: any) {
        return {
            message: 'Token invalido',
            status: err.response.data.statusCode
        }
    }
}

export async function resetPassword(credentials: ResetPassword): Promise<string> {
    const { password, token } = credentials;

    try {
        const res = await axios.post<{ message: string }>(url + '/reset', {
            'password': password
        }, {
            params: { 'token': token }
        });
        return res.data.message;
    } catch (err) {
        console.error('Error:', err);
        throw new Error('Failed. Please check your credentials.');
    }
}
