import utils from './utils';

const { ABS, isTarget, calcLen, calcAngle } = utils

interface IGesture {
  _init: Function
  _emit: Function
  _touch: Function
  _move: Function
  _end: Function
  on: Function
  off: Function
  set: Function
  _cancel: Function
  destroy: Function
}

type IPoint = Event | { 
  target: any; 
  preventDefault: Function; 
  touches: Event[],
} | {
  pageX: number,
  pageY: number,
}

class Gesture implements IGesture {
  target: HTMLElement | null | object
    & {
      addEventListener: Function,
      removeEventListener: Function
    }
  selector: HTMLElement
  handles: object
  distance: number
  touch: {
    startX: number,
    startY: number,
    startTime: number
  }
  longTapTimeout: NodeJS.Timeout | null
  tapTimeout: NodeJS.Timeout
  doubleTap: boolean
  longtapTime: NodeJS.Timeout | number
  preVector: {
    x: number | null,
    y: number | null
  }
  startDistance: number
  pretouch: {
    time: number,
    startX: number,
    startY: number
  }
  e: Event
  movetouch: {
    x: number,
    y: number
  }
  params: {
    zoom: number,
    deltaX: number,
    deltaY: number,
    diffX: number,
    diffY: number,
    angle: number,
    direction: string,
    selector?: HTMLElement
  } | null
  constructor(target, selector) {
    this.target = target instanceof HTMLElement 
      ? target 
      : typeof target === "string" 
        ? document.querySelector(target) 
        : null;
    if (!this.target) return;
    this.selector = selector;
    this._init();
    this.pretouch = {
      startX: 0,
      startY: 0,
      time: 0
    };
    this.handles = {};
    this.preVector = {
      x: null,
      y: null
    }
    this.distance = 30;
    this._touch = this._touch.bind(this);
    this._move = this._move.bind(this);
    this._end = this._end.bind(this);
    this._cancel = this._cancel.bind(this);
    this.target.addEventListener('touchstart', this._touch, false);
    this.target.addEventListener('touchmove', this._move, false);
    this.target.addEventListener('touchend', this._end, false);
    this.target.addEventListener('touchcancel', this._cancel, false);
  }
  _touch(e: {
    target: any,
    preventDefault: Function,
    touches: Array<Event>
  }) {
    this.e = e.target;
    var point: IPoint = e.touches ? e.touches[0] : e;
    var now = Date.now();
    this.touch.startX = point.pageX;
    this.touch.startY = point.pageY;
    this.touch.startTime = now;
    this.longTapTimeout && clearTimeout(this.longTapTimeout);
    this.tapTimeout && clearTimeout(this.tapTimeout);
    this.doubleTap = false;
    this._emit('touch', e);
    if (e.touches.length > 1) {
      var point2: IPoint = e.touches[1];
      this.preVector = {
        x: point2.pageX - this.touch.startX,
        y: point2.pageY - this.touch.startY
      }
      this.startDistance = calcLen(this.preVector);
      this._emit('multitouch', e);
    } else {
      var self = this;
      this.longTapTimeout = setTimeout(function () {
        self._emit('longtap', e);
        self.doubleTap = false;
        e.preventDefault();
      }, ~~this.longtapTime || 800);
      this.doubleTap =
        !!(this.pretouch.time && now
          - this.pretouch.time < 300 && ABS(this.touch.startX
            - this.pretouch.startX) < 30 && ABS(this.touch.startY
              - this.pretouch.startY) < 30 && ABS(this.touch.startTime
                - this.pretouch.time) < 300);
      this.pretouch = { //reserve the last touch
        startX: this.touch.startX,
        startY: this.touch.startY,
        time: this.touch.startTime
      };
    }
  }
  _move(e) {
    var point = e.touches ? e.touches[0] : e;
    this._emit('move', e);
    if (e.touches.length > 1) { //multi touch
      var point2 = e.touches[1];
      var v = {
        x: point2.pageX - point.pageX,
        y: point2.pageY - point.pageY
      };
      this._emit('multimove', e);
      if (this.preVector.x !== null) {
        if (this.startDistance) {
          this.params && (this.params.zoom = calcLen(v) / this.startDistance);
          this._emit('pinch', e);
        }
        this.params && (this.params.angle = calcAngle(v, this.preVector));
        this._emit('rotate', e);
      }
      this.preVector.x = v.x;
      this.preVector.y = v.y;
    } else {
      var diffX = point.pageX - this.touch.startX,
        diffY = point.pageY - this.touch.startY
      this.params && (this.params.diffY = diffY);
      this.params && (this.params.diffX = diffX);
      if (this.params) {
        if (this.movetouch.x) {
          this.params.deltaX = point.pageX - this.movetouch.x;
          this.params.deltaY = point.pageY - this.movetouch.y;
        } else {
          this.params.deltaX = this.params.deltaY = 0;
        }
      }
      if (ABS(diffX) > 30 || ABS(diffY) > 30) {
        this.longTapTimeout && clearTimeout(this.longTapTimeout);
        this.tapTimeout && clearTimeout(this.tapTimeout);
        this.doubleTap = false;
      }
      this._emit('slide', e);
      this.movetouch.x = point.pageX;
      this.movetouch.y = point.pageY;
    }
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }
  _end(e) {
    this.longTapTimeout && clearTimeout(this.longTapTimeout);
    var timestamp = Date.now();
    var deltaX = ~~((this.movetouch.x || 0) - this.touch.startX),
      deltaY = ~~((this.movetouch.y || 0) - this.touch.startY);
    var direction = '';
    this._emit('end', e);
    if (this.movetouch.x && (ABS(deltaX) > this.distance || this.movetouch.y !== null && ABS(deltaY) > this.distance)) { //swipe happened
      if (!this.params) {
        return
      }
      if (ABS(deltaX) < ABS(deltaY)) { //swipeup and swipedown,but it generally used as a scrolling window
        if (deltaY < 0) {
          this._emit('swipeUp', e)
          this.params.direction = 'up';
        } else {
          this._emit('swipeDown', e);
          this.params.direction = 'down';
        }
      } else {
        if (deltaX < 0) {
          this._emit('swipeLeft', e);
          this.params.direction = 'left';
        } else {
          this._emit('swipeRight', e);
          this.params.direction = 'right';
        }
      }
      this._emit('swipe', e);
      this._emit("finish", e);
    } else {
      if (!this.doubleTap && timestamp - this.touch.startTime < 300) {
        this.tapTimeout = setTimeout(() => {
          this._emit('tap', e);
          this._emit("finish", e);
        }, 300);
      } else if (this.doubleTap) {
        this._emit('dbtap', e);
        this.tapTimeout && clearTimeout(this.tapTimeout);
        this._emit("finish", e);
      } else {
        this._emit("finish", e);
      }
    }
    this._init();
    this.preVector = {
      x: 0,
      y: 0
    }
  }
  _cancel(e) {
    this._emit('cancel', e);
    this._end(e);
  }
  _emit(type, e) {
    !this.handles[type] && (this.handles[type] = []);
    var currentTarget = isTarget(this.e, this.selector);
    if (currentTarget || !this.selector) {
      this.selector && this.params && (this.params.selector = currentTarget);
      for (var i = 0, len = this.handles[type].length; i < len; i++) {
        typeof this.handles[type][i] === 'function' && this.handles[type][i](e, this.params);
      }
    }
    return true;
  }
  on(type, callback) {
    !this.handles[type] && (this.handles[type] = []);
    this.handles[type].push(callback);
    return this;
  }
  off(type) {
    this.handles[type] = [];
  }
  destroy() {
    this.longTapTimeout && clearTimeout(this.longTapTimeout);
    this.tapTimeout && clearTimeout(this.tapTimeout);
    if (this.target) {
      this.target.removeEventListener('touchstart', this._touch);
      this.target.removeEventListener('touchmove', this._move);
      this.target.removeEventListener('touchend', this._end);
      this.target.removeEventListener('touchcancel', this._cancel);
    }
    this.params = this.handles = this.movetouch = this.pretouch = this.touch = this.longTapTimeout = null;
    return false;
  }
  set(obj) {
    for (var i in obj) {
      if (i === 'distance') this.distance = ~~obj[i];
      if (i === 'longtapTime') this.longtapTime = Math.max(500, ~~obj[i]);
    }
    return this;
  }
  _init() {
    this.touch = {
      startTime: 0,
      startX: 0,
      startY: 0
    };
    this.movetouch = {
      x: 0,
      y:0
    }
    this.params = {
      zoom: 1,
      deltaX: 0,
      deltaY: 0,
      diffX: 0,
      diffY: 0,
      angle: 0,
      direction: ''
    };
  }
}

export default Gesture;
