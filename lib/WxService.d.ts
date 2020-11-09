interface IWxService {
    miniSaveVideo: Function;
    miniScanCode: Function;
    wxH5Share: Function;
}
declare class WxService implements IWxService {
    /**
     * 微信小程序保存视频
     * @param videoUrl 视频的url
     */
    miniSaveVideo: (videoUrl: string) => void;
    /**
     * 微信小程序扫码
     */
    miniScanCode: () => Promise<unknown>;
    /**
     * 微信h5页面分享
     * @param shareData 分享的数据
     * @param fn 分享中需要插入的特定函数，比如调起悦跑圈原生方法
     * run.menuShare(shareData);
     */
    wxH5Share: (shareData: any, fn?: Function | undefined) => void;
}
declare const _default: WxService;
export default _default;
