interface ITimes {
    format: Function;
}
declare class Times implements ITimes {
    private _date;
    constructor();
    /**
   * 格式化时间
   *
   * @param  {time} 时间
   * @param  {cFormat} 格式
   * @return {String} 字符串
   *
   * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
   */
    formatTime(time: any, cFormat: any): any;
    /**
     * 返回指定长度的月份集合
     *
     * @param  {time} 时间
     * @param  {len} 长度
     * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
     * @return {Array} 数组
     *
     * @example   getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
     */
    getMonths(time: any, len: any, direction: any): any;
    /**
     * 返回指定长度的天数集合
     *
     * @param  {time} 时间
     * @param  {len} 长度
     * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
     * @return {Array} 数组
     *
     * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
     */
    getDays(time: any, len: any, diretion?: number): string[];
    /**
     * @param  {s} 秒数
     * @return {String} 字符串
     *
     * @example formatHMS(3610) // -> 1h0m10s
     */
    formatHMS(s: any): string;
    getMonthOfDay(time: any): any;
    getYearOfDay(time: any): number;
    getFirstDayOfYear(time: any): string;
    getLastDayOfYear(time: any): string;
    getDayOfYear(time: any): number;
    getDayOfYearWeek(time: any): number;
    /**
     * @params{string} 1990/01/01 or 1990-01-01
     * @return{number}
     */
    getAge(date: any): number;
    format(): void;
}
declare const _default: Times;
export default _default;
