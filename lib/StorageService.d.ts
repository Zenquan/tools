declare class StorageService {
    ls: Storage;
    ss: Storage;
    constructor();
    setLocal(key: string, val: any): void;
    getLocal(key: string): any;
    removeLocal(key: string): void;
    clearLocal(): void;
    setSession(key: string, val: any): void;
    getSession(key: string): any;
    removeSession(key: string): void;
    clearSession(): void;
    /**
     * 站外环境设置悦跑cookie
     * @param uid 用户uid
     * @param sid 用户sid
     */
    setYpcookie(uid: string, sid: string): void;
}
export default StorageService;
