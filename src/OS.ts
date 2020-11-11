declare const wx: any

export type NetworkType = '2g' | '3g' | '4g' | 'wifi'

/**
 *系统环境检测
*
*/
export const os = (() => {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isChrome = /(?:Chrome|CriOS)/.test(ua)

  const isTablet
    = /(?:iPad|PlayBook)/.test(ua)
    || (isAndroid && !/(?:Mobile)/.test(ua))
    || (isFireFox && /(?:Tablet)/.test(ua))

  const isPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isPhone && !isAndroid && !isSymbian

  const isWeChat = /MicroMessenger/.test(navigator.userAgent) 
                    && !/WindowsWechat/.test(navigator.userAgent)
  const isIOS = navigator.userAgent.indexOf('iP') > -1
  const isPC = !/(iPhone|iPod|Android|ios)/i.test(navigator.userAgent)

  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
    isChrome,
    isWeChat,
    isIOS,
    isPC
  }
})()

class OS {
  public os: {
    isTablet: boolean,
    isPhone: boolean,
    isAndroid: boolean,
    isPc: boolean,
    isChrome: boolean,
    isWeChat: boolean,
    isIOS: boolean,
    isPC: boolean
  }
  constructor () {
    this.os = os
  }
  /**
   *
   *
   * @export 获取网络类型
   * @returns {Promise<NetworkType>}
   */
  getNetworkType (): Promise<NetworkType> {
    if (this.os.isPc) {
      return Promise.resolve<NetworkType>('wifi')
    } else if ( window.navigator
      && (window.navigator as any).connection
      && (window.navigator as any).connection.effectiveType
    ) {
      // 普通 html5
      return Promise.resolve<NetworkType>((window.navigator as any).connection.effectiveType)
    } else if (typeof wx !== 'undefined') {
      // 微信拍断
      return new Promise(((resolve) => wx.ready(() =>
        wx.getNetworkType({success: (res: any) => resolve(res.networkType)})
      )))
    } else {
      return Promise.resolve<NetworkType>('wifi')
    }
  }
  setRootFontSizeFromClient() {
    let dpr, rem;
    const htmlEl = document.getElementsByTagName("html")[0],
      docEl = document.documentElement,
      metaEl: Element | null = document.querySelector('meta[name="viewport"]');

    dpr = (window as any).devicePixelRatio || 1;
    rem = docEl.clientWidth / 7.5;
  
    if (metaEl) {
      metaEl.setAttribute(
        "content",
        `width=${
          docEl.clientWidth
        },initial-scale=${1},maximum-scale=${1}, minimum-scale=${1},use-scalable=no`
      );
    }
  
    docEl.setAttribute("data-dpr", dpr);
    htmlEl.style.fontSize = `${rem}px`;
  
    (window as any).dpr = dpr;
    (window as any).rem = rem;
    (window as any).r = function(value) {
      value = Number(value);
      // @ts-ignore
      return `${value / process.env.designWidth}rem`;
    };
  
    (window as any).onresize = function() {
      htmlEl.style.fontSize = `${document.documentElement.clientWidth / 7.5}px`;
    };
  }
  checkAppV1AndV2 (v1: string, v2: string) {
    let _v1: Array<string> = v1.split("."),
      _v2: Array<string> = v2.split("."),
      _r = +_v1[0] - (+_v2[0]),
      flag = _r == 0 
            && v1 != v2 
            ? this.checkAppV1AndV2(
                _v1.splice(1).join("."), 
                _v2.splice(1).join(".")
              ) 
            : _r;

    return flag;
  }
  checkAppVersionIsOK (basic, target) {
    return !(this.checkAppV1AndV2(basic, target) > 0)
  }
}

export default new OS()