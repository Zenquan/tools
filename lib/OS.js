/**
 *系统环境检测
*
*/
export const os = (() => {
    const ua = navigator.userAgent;
    const isWindowsPhone = /(?:Windows Phone)/.test(ua);
    const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    const isAndroid = /(?:Android)/.test(ua);
    const isFireFox = /(?:Firefox)/.test(ua);
    const isChrome = /(?:Chrome|CriOS)/.test(ua);
    const isTablet = /(?:iPad|PlayBook)/.test(ua)
        || (isAndroid && !/(?:Mobile)/.test(ua))
        || (isFireFox && /(?:Tablet)/.test(ua));
    const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    const isPc = !isPhone && !isAndroid && !isSymbian;
    const isWeChat = /MicroMessenger/.test(navigator.userAgent)
        && !/WindowsWechat/.test(navigator.userAgent);
    const isIOS = navigator.userAgent.indexOf('iP') > -1;
    const isPC = !/(iPhone|iPod|Android|ios)/i.test(navigator.userAgent);
    return {
        isTablet,
        isPhone,
        isAndroid,
        isPc,
        isChrome,
        isWeChat,
        isIOS,
        isPC
    };
})();
class OS {
    constructor() {
        this.os = os;
    }
    /**
     *
     *
     * @export 获取网络类型
     * @returns {Promise<NetworkType>}
     */
    getNetworkType() {
        if (this.os.isPc) {
            return Promise.resolve('wifi');
        }
        else if (window.navigator
            && window.navigator.connection
            && window.navigator.connection.effectiveType) {
            // 普通 html5
            return Promise.resolve(window.navigator.connection.effectiveType);
        }
        else if (typeof wx !== 'undefined') {
            // 微信拍断
            return new Promise(((resolve) => wx.ready(() => wx.getNetworkType({ success: (res) => resolve(res.networkType) }))));
        }
        else {
            return Promise.resolve('wifi');
        }
    }
    setRootFontSizeFromClient() {
        let dpr, rem;
        const htmlEl = document.getElementsByTagName("html")[0], docEl = document.documentElement, metaEl = document.querySelector('meta[name="viewport"]');
        dpr = window.devicePixelRatio || 1;
        rem = docEl.clientWidth / 7.5;
        if (metaEl) {
            metaEl.setAttribute("content", `width=${docEl.clientWidth},initial-scale=${1},maximum-scale=${1}, minimum-scale=${1},use-scalable=no`);
        }
        docEl.setAttribute("data-dpr", dpr);
        htmlEl.style.fontSize = `${rem}px`;
        window.dpr = dpr;
        window.rem = rem;
        window.r = function (value) {
            value = Number(value);
            // @ts-ignore
            return `${value / process.env.designWidth}rem`;
        };
        window.onresize = function () {
            htmlEl.style.fontSize = `${document.documentElement.clientWidth / 7.5}px`;
        };
    }
    checkAppV1AndV2(v1, v2) {
        let _v1 = v1.split("."), _v2 = v2.split("."), _r = +_v1[0] - (+_v2[0]), flag = _r == 0
            && v1 != v2
            ? this.checkAppV1AndV2(_v1.splice(1).join("."), _v2.splice(1).join("."))
            : _r;
        return flag;
    }
    checkAppVersionIsOK(basic, target) {
        return !(this.checkAppV1AndV2(basic, target) > 0);
    }
}
export default new OS();
