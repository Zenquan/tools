import { AxiosRequestConfig, AxiosInstance } from 'axios';
export interface IRequest {
    getInstance(): AxiosInstance;
}
export default class Request implements IRequest {
    private api;
    private created;
    private handleInterceptors;
    constructor(config: AxiosRequestConfig);
    getInstance(): AxiosInstance;
}
export declare const mainApi: AxiosInstance;
export declare const baseApi: AxiosInstance;
