import { isEmpty, minBy} from 'lodash-es'

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


export default {
  isEmpty: _isEmpty,
}