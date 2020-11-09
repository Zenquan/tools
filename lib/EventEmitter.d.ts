/**
 *
 *
 * @class EventEmitter
 * @template T
 */
interface IEventEmitter {
    on: Function;
    once: Function;
    setMaxListeners: Function;
    listeners: Function;
    removeListener: Function;
    removeAllListener: Function;
    emit: Function;
}
declare class EventEmitter implements IEventEmitter {
    private events;
    private _maxListeners;
    constructor();
    on(type: any, listener: any): this;
    once(type: any, listener: any): this;
    setMaxListeners(maxListeners: any): void;
    listeners(event: any): any;
    removeListener(type: any, listener: any): this;
    removeAllListener(type: any): void;
    emit(type: any, ...args: any[]): this;
}
export default EventEmitter;
