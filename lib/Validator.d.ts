export interface IRule {
    strategy: string;
    errMsg: string;
    cb?(): void | undefined;
}
interface IValidator {
    add(value: any, rules: IRule[], cb?: () => any): void;
    start(): void;
}
declare class Validator implements IValidator {
    private cache;
    add(value: any, rules: any): void;
    start(): void;
}
declare const _default: Validator;
export default _default;
