
type IBrowerType = "Opera" | "Edge" | "Safari" | "Chrome" 
                    | "IE7" | "IE8" | "IE9" | "IE10" 
                    | "IE7以下" | "IE11" | "FF" | undefined

class Types<T> {
  // constructor () {
  //   this.type = this.type.bind(this)
  //   this.isString = this.isString.bind(this)
  // }
  type(type: T): string {
    return Object.prototype.toString.call(type).slice(8, -1);
  }
  //是否字符串
  isString(arg: T): boolean {
    return this.type(arg) === "String";
  }
  //是否数字
  isNumber(arg: T): boolean {
    return this.type(arg) === "Number";
  }
  //是否boolean
  isBoolean(arg: T): boolean {
    return this.type(arg) === "Boolean";
  }
  //是否函数
  isFunction(arg: T): boolean {
    return this.type(arg) === "Function";
  }
  //是否为null
  isNull(arg: T): boolean {
    return this.type(arg) === "Null";
  }
  //是否undefined
  isUndefined(arg: T): boolean {
    return this.type(arg) === "Undefined";
  }
  //是否对象
  isObj(arg: T): boolean {
    return this.type(arg) === "Object";
  }
  //是否数组
  isArray(arg: T): boolean {
    return this.type(arg) === "Array";
  }
  //是否时间
  isDate(arg: T): boolean {
    return this.type(arg) === "Date";
  }
  //是否正则
  isRegExp(arg: T): boolean {
    return this.type(arg) === "RegExp";
  }
  //是否错误对象
  isError(arg: T): boolean {
    return this.type(arg) === "Error";
  }
  //是否Symbol
  isSymbol(arg: T): boolean {
    return this.type(arg) === "Symbol";
  }
  //是否Promise对象
  isPromise(arg: T): boolean {
    return this.type(arg) === "Promise";
  }
  //是否Set对象
  isSet(arg: T): boolean {
    return this.type(arg) === "Set";
  }
  //是否为假
  isFalse(arg: any): boolean {
    if (
      arg == "" ||
      arg == undefined ||
      arg == 0 ||
      arg == null ||
      arg == "null" ||
      arg == "undefined" ||
      arg == false ||
      arg == NaN
    )
      return true;
    return false;
  }
  //是否为正
  isTrue(arg: T): boolean {
    return !this.isFalse(arg);
  }
  //是否为IOS
  isIOS(): boolean {
    let u: string = navigator.userAgent;
    if (u.indexOf("Linux") > -1 || u.indexOf("Android") > -1) {
      return false;
    } else if (u.indexOf("iPad") > -1) {
      return false;
    } else if (u.indexOf("window phone") > -1) {
      return false;
    } else if (u.indexOf("iphone")) {
      return true;
    } else {
      return false;
    }
  }
  //是否为PC端
  isPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod"
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  //是什么浏览器类型
  browserType(): IBrowerType {
    //取得浏览器的userAgent字符串
    let userAgent = navigator.userAgent;
    //判断是否Opera浏览器
    let isOpera = userAgent.indexOf("Opera") > -1;
    //判断是否IE浏览器
    let isIE =
      userAgent.indexOf("compatible") > -1 &&
      userAgent.indexOf("MSIE") > -1 &&
      !isOpera;
    let isIE11 =
      userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    //判断是否IE的Edge浏览器
    let isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
    //判断是否Firefox浏览器
    let isFF = userAgent.indexOf("Firefox") > -1;
    //判断是否Safari浏览器
    let isSafari =
      userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;
    //判断Chrome浏览器
    let isChrome =
      userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;
    
    let browser;
    if (isIE) {
      let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      let fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) browser = "IE7";
      else if (fIEVersion == 8) browser = "IE8";
      else if (fIEVersion == 9) browser = "IE9";
      else if (fIEVersion == 10) browser = "IE10";
      else browser = "IE7以下"; //IE版本过低
    }
    if (isIE11) browser = "IE11";
    if (isEdge) browser = "Edge";
    if (isFF) browser = "FF";
    if (isOpera) browser = "Opera";
    if (isSafari) browser = "Safari";
    if (isChrome) browser = "Chrome";

    return browser
  }

  // 严格的身份证校验
  isCardID(sId: string) {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
      alert("你输入的身份证长度或格式错误");
      return false;
    }
    //身份证城市
    let aCity: object = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    if (!aCity[parseInt(sId.substr(0, 2))]) {
      alert("你的身份证地区非法");
      return false;
    }

    // 出生日期验证
    let sBirthday: string = (
      sId.substr(6, 4) +
      "-" +
      Number(sId.substr(10, 2)) +
      "-" +
      Number(sId.substr(12, 2))
    ).replace(/-/g, "/"),
      d = new Date(sBirthday);
    if (
      sBirthday !=
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    ) {
      alert("身份证上的出生日期非法");
      return false;
    }

    // 身份证号码校验
    let sum = 0,
      weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
      codes = "10X98765432";
    for (let i = 0; i < sId.length - 1; i++) {
      sum += Number(sId[i]) * weights[i];
    }
    let last = codes[sum % 11]; //计算出来的最后一位身份证号码
    if (sId[sId.length - 1] != last) {
      alert("你输入的身份证号非法");
      return false;
    }

    return true;
  }
  /**
   * 判断字符串是否含有表情包
   * @param substring string
   */
  isEmojiCharacter(substring: string): boolean {
    let result: boolean = false;
    for (let i = 0; i < substring.length; i++) {
      let hs = substring.charCodeAt(i);
      if (0xd800 <= hs && hs <= 0xdbff) {
        if (substring.length > 1) {
          let ls = substring.charCodeAt(i + 1);
          let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            result = true;
          }
        }
      } else if (substring.length > 1) {
        let ls = substring.charCodeAt(i + 1);
        if (ls == 0x20e3) {
          result = true;
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          result = true;
        } else if (0x2B05 <= hs && hs <= 0x2b07) {
          result = true;
        } else if (0x2934 <= hs && hs <= 0x2935) {
          result = true;
        } else if (0x3297 <= hs && hs <= 0x3299) {
          result = true;
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
          || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
          || hs == 0x2b50) {
            result = true;
        }
      }
    }

    return result;
  }
  /**
   * 字符串文本的长度   
   * 一个汉字等于两个字符串
   * 一个字母等于一个字符串
   * @param value 字符串文本
   */
  validateTextLength (value: string) {
    // 中文、中文标点、全角字符按1长度，英文、英文符号、数字按0.5长度计算
    let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
    let mat = value.match(cnReg)
    let length
    if (mat) {
      length = (mat.length + (value.length - mat.length) * 0.5)
      return length
    } else {
      return value.length * 0.5
    }
  }
}

export default new Types()
