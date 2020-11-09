declare type IBrowerType = "Opera" | "Edge" | "Safari" | "Chrome" | "IE7" | "IE8" | "IE9" | "IE10" | "IE7以下" | "IE11" | "FF" | undefined;
declare class Types<T> {
    type(type: T): string;
    isString(arg: T): boolean;
    isNumber(arg: T): boolean;
    isBoolean(arg: T): boolean;
    isFunction(arg: T): boolean;
    isNull(arg: T): boolean;
    isUndefined(arg: T): boolean;
    isObj(arg: T): boolean;
    isArray(arg: T): boolean;
    isDate(arg: T): boolean;
    isRegExp(arg: T): boolean;
    isError(arg: T): boolean;
    isSymbol(arg: T): boolean;
    isPromise(arg: T): boolean;
    isSet(arg: T): boolean;
    isFalse(arg: any): boolean;
    isTrue(arg: T): boolean;
    isIOS(): boolean;
    isPC(): boolean;
    browserType(): IBrowerType;
    isCardID(sId: string): boolean;
    /**
     * 判断字符串是否含有表情包
     * @param substring string
     */
    isEmojiCharacter(substring: string): boolean;
    /**
     * 字符串文本的长度
     * 一个汉字等于两个字符串
     * 一个字母等于一个字符串
     * @param value 字符串文本
     */
    validateTextLength(value: string): any;
}
declare const _default: Types<unknown>;
export default _default;
