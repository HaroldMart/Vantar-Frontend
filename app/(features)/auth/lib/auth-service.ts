import axios, { AxiosResponse } from 'axios';

import { API } from "../../shared/api";
import { LoginCredentials, Tokens, ResetPassword, SingupCredentials } from './interfaces';

export class AuthService {
    private readonly url: string = API + '/auth';

    public async login(credentials: LoginCredentials): Promise<AxiosResponse<Tokens>> {
        return axios.post<Tokens>(this.url + '/login', credentials);
    }

    public async singUp(credentials: SingupCredentials):Promise<AxiosResponse<string>> {
        return axios.post<string>(API + '/users/create', credentials);
    }

    public async refresh(token: string): Promise<AxiosResponse<Tokens>> {
        return axios.post<Tokens>(this.url + '/refresh', token, {
            headers: { 'token': token }
        });
    }

    public async logout(token: string): Promise<AxiosResponse<string>> {
        return axios.get<string>(this.url + '/logout', {
            headers: { 'token': token }
        });
    }

    public async forgotPassword(email: string): Promise<AxiosResponse<{ message: string }>> {
        return axios.post<{ message: string }>(this.url + '/forgot', email);
    }

    public async activateAccount(token: string): Promise<AxiosResponse<{ message: string }>> {
        return axios.get<{ message: string }>(this.url + '/activate', {
            params: { 'token': token }
        });
    }

    public async resetPassword(credentials: ResetPassword): Promise<AxiosResponse<{ message: string }>> {
        const { password, token } = credentials;

        return axios.post<{ message: string }>(this.url + '/reset', {
            'password': password
        },{
            params: { 'token': token }
        });
    }
}