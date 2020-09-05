import { isEmpty, minBy } from 'lodash-es'

function _isEmpty(value) {
  if (
    typeof value === 'undefined' ||
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    value instanceof Date) {
    return !Boolean(value);
  } else {
    return isEmpty(value);
  }
}

let ABS = Math.abs;
let isTarget = function (obj, selector) {
  while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
    if (obj.matches(selector)) {
      return obj;
    }
    obj = obj.parentNode;
  }
  return null;
}
let calcLen = function (v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
let calcAngle = function (a, b) {
  let l = calcLen(a) * calcLen(b),
    cosValue, angle;
  if (l) {
    cosValue = (a.x * b.x + a.y * b.y) / l;
    angle = Math.acos(Math.min(cosValue, 1))
    angle = a.x * b.y - b.x * a.y > 0 ? -angle : angle;
    return angle * 180 / Math.PI;
  }
  return 0;
}

export default {
  isEmpty: _isEmpty,
  ABS,
  isTarget,
  calcLen,
  calcAngle
}