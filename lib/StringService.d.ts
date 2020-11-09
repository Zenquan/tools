interface IStringService {
    toParseJson: Function;
    trim: Function;
    changeCase: Function;
    checkPwd: Function;
    filterTag: Function;
}
declare class StringService implements IStringService {
    toParseJson(str: string): any;
    /**
    * 去除空格
    * @param  {str}
    * @param  {type}
    *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
    * @return {String}
    */
    trim(str: string, type: number): string;
    /**
     * @param  {str}
     * @param  {type}
     *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
     * @return {String}
     */
    changeCase(str: string, type: number): string;
    checkPwd(str: string): number;
    filterTag(str: string): string;
}
declare const _default: StringService;
export default _default;
