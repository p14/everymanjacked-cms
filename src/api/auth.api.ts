import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import { LoginData, TokenData } from '../models/auth.model';

export const setupAuthConfig = (method: string, url: string, data: any): AxiosRequestConfig => {
    return {
        method,
        url: (
            String(process.env.REACT_APP_BUILD) === String('production')
                ? process.env.REACT_APP_API_PRODUCTION
                : process.env.REACT_APP_API_DEVELOPMENT
        ) + url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
        },
        data,
    }
};

export const setTokenStorage = (result: TokenData): void => {
    localStorage.setItem('AccessToken', result.AuthenticationResult.AccessToken);
    localStorage.setItem('RefreshToken', result.AuthenticationResult.RefreshToken);
};

export const clearTokenStorage = (): void => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
};

export const statusCheck = (): Promise<AxiosResponse> => {
    return axios.request({
        method: 'GET',
        url: (
            String(process.env.REACT_APP_BUILD) === String('production')
                ? process.env.REACT_APP_API_PRODUCTION
                : process.env.REACT_APP_API_DEVELOPMENT
        ) + '/api/status-check',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
        },
    });
};


export const login = (loginData: LoginData): Promise<AxiosResponse> => {
    const config = setupAuthConfig('POST', '/account/admin/login', loginData);
    return axios.request(config);
};

export const logout = (): void => {
    clearTokenStorage();
    window.location.href = '/';
};

export const refresh = async (): Promise<string> => {
    const refreshToken = localStorage.getItem('RefreshToken');
    if (!refreshToken) {
        throw new Error('No Refresh Token Found');
    }

    const config = setupAuthConfig('POST', '/account/refresh', { refreshToken });
    return axios.request(config)
        .then((response) => response.data)
        .then((data => {
            setTokenStorage(data)
            return data.AuthenticationResult.AccessToken;
        }))
        .catch((error) => console.error(error.response.data));
};

export const isExpired = (unixTime: number): boolean => {
    const expiration = unixTime * 1000;
    return expiration < Date.now();
};

export const isTokenExpired = (token: string): boolean => {
    const tokenDecoded = jwt_decode(token) as any;
    const tokenExpiration = parseInt(tokenDecoded.exp);
    if (!isExpired(tokenExpiration)) {
        return false;
    }
    return true;
};

export const setupConfig = async (method: string, url: string, data?: any): Promise<AxiosRequestConfig> => {
    let accessToken = String(localStorage.getItem('AccessToken'));
    if (isTokenExpired(accessToken)) {
        accessToken = await refresh();
    }

    return {
        method,
        url: (
            String(process.env.REACT_APP_BUILD) === String('production')
                ? process.env.REACT_APP_API_PRODUCTION
                : process.env.REACT_APP_API_DEVELOPMENT
        ) + url,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Authorization': accessToken,
        },
        data,
    }
};
