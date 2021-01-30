class StorageService {
  public ls: Storage;
  public ss: Storage;
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }

  /*-----------------localStorage---------------------*/
  /*设置localStorage*/
  setLocal(key: string, val) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val))
    }

  }

  /*获取localStorage*/
  getLocal(key: string) {
    if (key) return JSON.parse(`${this.ls.getItem(key)}`)
    return null;

  }

  /*移除localStorage*/
  removeLocal(key: string) {
    this.ls.removeItem(key)
  }

  /*移除所有localStorage*/
  clearLocal() {
    this.ls.clear()
  }


  /*-----------------sessionStorage---------------------*/
  /*设置sessionStorage*/
  setSession(key: string, val) {
    let setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (let i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]))
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val))
    }

  }

  /*获取sessionStorage*/
  getSession(key: string) {
    if (key) return JSON.parse(`${this.ss.getItem(key)}`)
    return null;

  }

  /*移除sessionStorage*/
  removeSession(key: string) {
    this.ss.removeItem(key)
  }

  /*移除所有sessionStorage*/
  clearSession() {
    this.ss.clear()
  }

  /**
   * 设置cookie
   * @param cookie cookie的值
   */
  setCookie(cookie: string) {
    document.cookie = cookie
  }

  /**
   * 站外环境设置悦跑cookie
   * @param uid 用户uid
   * @param sid 用户sid
   */
  setYpcookie(uid: string, sid: string) {
    const ypcookie = encodeURIComponent(`uid=${uid}&sid=${sid}`)
    this.setCookie(`ypcookie=${ypcookie}`)
  }

}

export default StorageService;