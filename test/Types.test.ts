import types from '../src/Types'

const type = types.type

test('#Number', () => {
  expect(type(2)).toEqual('Number');
});

test('#String', () => {
  expect(type('zen')).toEqual('String');
});

test('#Boolean', () => {
  expect(type(true)).toEqual('Boolean');
});

test('#Null', () => {
  expect(type(null)).toEqual('Null');
});

test('#Undefined', () => {
  expect(type(undefined)).toEqual('Undefined');
});

test('#Array', () => {
  expect(type([])).toEqual('Array');
});

test('#Object', () => {
  expect(type({})).toEqual('Object');
});

test('#Function', () => {
  expect(type(() => {})).toEqual('Function');
});

test('#isString', () => {
  // const isString = types.isString
  expect(types.isString('zenquan')).toEqual(true);
});

test('#isNumber', () => {
  expect(types.isNumber(0)).toEqual(true);
});

test('#isBoolean', () => {
  expect(types.isBoolean(true)).toEqual(true);
});

test('#isFunction', () => {
  expect(types.isFunction(() => {})).toEqual(true);
});

test('#isNull', () => {
  expect(types.isNull(null)).toEqual(true);
});

test('#isUndefined', () => {
  var a = 1
  expect(types.isUndefined(a)).toEqual(false);
});

test('#isObj', () => {
  expect(types.isObj({})).toEqual(true);
});

test('#isArray', () => {
  expect(types.isArray([])).toEqual(true);
});

test('#isDate', () => {
  expect(types.isDate(111)).toEqual(false);
});

test('#isRegExp', () => {
  expect(types.isRegExp(/\d+/)).toEqual(true);
});

test('#isError', () => {
  expect(types.isError(new Error())).toEqual(true);
});

test('#isSymbol', () => {
  expect(types.isSymbol(Symbol('zen-tools'))).toEqual(true);
});

test('#isPromise', () => {
  let p1 = new Promise((resolve, reject) => {
    resolve()
  }).catch(error => {
    console.log('error>>>', error);
  })
  expect(types.isPromise(p1)).toEqual(true);
});

test('#isSet', () => {
  const a = new Set()
  expect(types.isSet(a)).toEqual(true);
});

test('#isFalse', () => {
  expect(types.isFalse(1 > 3)).toEqual(true);
});

test('#isTrue', () => {
  expect(types.isFalse(1 > 3)).toEqual(true);
});

test('#isCardID', () => {
  expect(types.isCardID('440582199405070432')).toEqual(true);
});

test('#isEmojiCharacter', () => {
  expect(types.isEmojiCharacter('😅')).toEqual(true);
});

test('#validateTextLength', () => {
  expect(types.validateTextLength('abc')).toEqual(1.5);
});