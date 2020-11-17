export declare type NetworkType = '2g' | '3g' | '4g' | 'wifi';
/**
 *系统环境检测
*
*/
export declare const os: {
    isTablet: boolean;
    isPhone: boolean;
    isAndroid: boolean;
    isPc: boolean;
    isChrome: boolean;
    isWeChat: boolean;
    isIOS: boolean;
    isPC: boolean;
};
declare class OS {
    os: {
        isTablet: boolean;
        isPhone: boolean;
        isAndroid: boolean;
        isPc: boolean;
        isChrome: boolean;
        isWeChat: boolean;
        isIOS: boolean;
        isPC: boolean;
    };
    constructor();
    /**
     *
     *
     * @export 获取网络类型
     * @returns {Promise<NetworkType>}
     */
    getNetworkType(): Promise<NetworkType>;
    setRootFontSizeFromClient(): void;
    checkAppV1AndV2(v1: string, v2: string): any;
    checkAppVersionIsOK(basic: any, target: any): boolean;
}
declare const _default: OS;
export default _default;
